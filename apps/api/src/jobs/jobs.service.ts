import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiServicesService } from '../ai-services/ai-services.service';
import { JobStatus as PrismaJobStatus } from '@prisma/client';
import { JobStatus } from '@talentrix/shared-types';
import type { CreateJobDto, UpdateJobDto, JobFilters } from '@talentrix/shared-types';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiServices: AiServicesService
  ) {}

  async create(dto: CreateJobDto, tenantId: string) {
    const embeddingText = `${dto.title}\nDepartment: ${dto.department}\nDescription: ${dto.description}\nSkills: ${(dto.skills ?? []).join(', ')}`;
    let embeddingVector: number[] = [];

    try {
      const res = await this.aiServices.embed({ input: embeddingText });
      embeddingVector = res.embeddings[0] ?? [];
    } catch {
      embeddingVector = new Array(1536).fill(0);
    }

    const job = await this.prisma.job.create({
      data: {
        title: dto.title,
        department: dto.department,
        location: dto.location as any,
        workMode: dto.workMode as any,
        employmentType: dto.employmentType as any,
        seniority: dto.seniority as any,
        status: PrismaJobStatus.DRAFT,
        description: dto.description,
        requirements: dto.requirements ?? [],
        niceToHave: dto.niceToHave ?? [],
        skills: dto.skills ?? [],
        salaryRange: dto.salaryRange as any,
        openings: dto.openings ?? 1,
        hiringManagerId: dto.hiringManagerId,
        recruiterId: dto.recruiterId ?? null,
        tenantId,
      },
    });

    if (embeddingVector.length === 1536) {
      const vectorStr = `[${embeddingVector.join(',')}]`;
      await this.prisma.$executeRaw`
        UPDATE jobs SET embedding = ${vectorStr}::vector WHERE id = ${job.id}
      `;
    }

    return job;
  }

  async findAll(filters: JobFilters, tenantId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    if (filters.status) where.status = filters.status as any;
    if (filters.department) where.department = filters.department;
    if (filters.workMode) where.workMode = filters.workMode as any;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { department: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.job.findMany({
      where,
      include: { hiringManager: true, recruiter: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublic() {
    return this.prisma.job.findMany({
      where: { status: PrismaJobStatus.OPEN },
      select: {
        id: true,
        title: true,
        department: true,
        location: true,
        workMode: true,
        employmentType: true,
        seniority: true,
        description: true,
        requirements: true,
        skills: true,
        salaryRange: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { hiringManager: true, recruiter: true },
    });
    if (!job) throw new NotFoundException(`Job with ID ${id} not found`);
    return job;
  }

  async getShortlist(jobId: string) {
    await this.findOne(jobId);
    return this.aiServices.getShortlistForJob(jobId);
  }

  async update(id: string, dto: UpdateJobDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.department !== undefined) updateData.department = dto.department;
    if (dto.location !== undefined) updateData.location = dto.location;
    if (dto.workMode !== undefined) updateData.workMode = dto.workMode;
    if (dto.employmentType !== undefined) updateData.employmentType = dto.employmentType;
    if (dto.seniority !== undefined) updateData.seniority = dto.seniority;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.requirements !== undefined) updateData.requirements = dto.requirements;
    if (dto.niceToHave !== undefined) updateData.niceToHave = dto.niceToHave;
    if (dto.skills !== undefined) updateData.skills = dto.skills;
    if (dto.salaryRange !== undefined) updateData.salaryRange = dto.salaryRange;
    if (dto.openings !== undefined) updateData.openings = dto.openings;
    if (dto.recruiterId !== undefined) updateData.recruiterId = dto.recruiterId;

    const job = await this.prisma.job.update({
      where: { id },
      data: updateData,
    });

    if (dto.description || dto.title || dto.skills) {
      const embeddingText = `${job.title}\nDepartment: ${job.department}\nDescription: ${job.description}\nSkills: ${job.skills.join(', ')}`;
      try {
        const res = await this.aiServices.embed({ input: embeddingText });
        const vectorStr = `[${(res.embeddings[0] ?? []).join(',')}]`;
        if (vectorStr.length > 10) {
          await this.prisma.$executeRaw`
            UPDATE jobs SET embedding = ${vectorStr}::vector WHERE id = ${job.id}
          `;
        }
      } catch {
        // Fallback in dev
      }
    }

    return job;
  }

  async updateStatus(id: string, status: JobStatus) {
    await this.findOne(id);
    const data: any = { status };
    if (status === JobStatus.OPEN) data.publishedAt = new Date();
    if (status === JobStatus.CLOSED) data.closedAt = new Date();

    return this.prisma.job.update({
      where: { id },
      data,
    });
  }
}
