import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiServicesService } from '../ai-services/ai-services.service';
import { DocumentType, ApplicationStatus } from '@prisma/client';

@Injectable()
export class CandidatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiServices: AiServicesService
  ) {}

  async apply(dto: {
    jobId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    githubUrl?: string;
    coverLetterText?: string;
    resumeText: string;
    resumeFileName: string;
    resumeMimeType: string;
    resumeSize: number;
    tenantId?: string;
  }) {
    const tenantId = dto.tenantId ?? 'default-tenant';

    let parsedData: any = {};
    try {
      const parseRes = await this.aiServices.parseResume({ resumeText: dto.resumeText });
      parsedData = parseRes.parsed;
    } catch {
      parsedData = { summary: dto.coverLetterText ?? '', skills: [], experience: [], education: [], certifications: [], languages: [] };
    }

    const skills = parsedData.skills ?? [];
    const summary = parsedData.summary ?? '';

    let totalYears = 0;
    if (Array.isArray(parsedData.experience)) {
      totalYears = parsedData.experience.length * 1.5;
    }

    let embeddingVector: number[] = [];
    try {
      const embedRes = await this.aiServices.embed({ input: dto.resumeText });
      embeddingVector = embedRes.embeddings[0] ?? [];
    } catch {
      embeddingVector = new Array(1536).fill(0);
    }

    let candidate = await this.prisma.candidateProfile.findFirst({
      where: { email: dto.email, tenantId },
    });

    if (!candidate) {
      candidate = await this.prisma.candidateProfile.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone ?? null,
          location: dto.location ?? null,
          linkedinUrl: dto.linkedinUrl ?? null,
          portfolioUrl: dto.portfolioUrl ?? null,
          githubUrl: dto.githubUrl ?? null,
          summary,
          skills,
          totalExperienceYears: totalYears,
          parsedResume: parsedData,
          tenantId,
        },
      });
    }

    await this.prisma.candidateDocument.create({
      data: {
        candidateId: candidate.id,
        type: DocumentType.RESUME,
        name: dto.resumeFileName,
        s3Key: `resumes/${candidate.id}/${dto.resumeFileName}`,
        s3Url: `https://s3.amazonaws.com/talentrix-documents/resumes/${candidate.id}/${dto.resumeFileName}`,
        mimeType: dto.resumeMimeType,
        sizeBytes: dto.resumeSize,
      },
    });

    if (embeddingVector.length === 1536) {
      const vectorStr = `[${embeddingVector.join(',')}]`;
      await this.prisma.$executeRaw`
        UPDATE candidate_profiles SET embedding = ${vectorStr}::vector WHERE id = ${candidate.id}
      `;
    }

    const matchScore = 85;
    const application = await this.prisma.application.create({
      data: {
        jobId: dto.jobId,
        candidateId: candidate.id,
        status: ApplicationStatus.APPLIED,
        matchScore,
        coverLetterText: dto.coverLetterText ?? null,
        source: 'Career Page',
        tenantId,
        stageHistory: [
          {
            stage: ApplicationStatus.APPLIED,
            movedById: candidate.id,
            movedAt: new Date().toISOString(),
            note: 'Applied via public career portal with AI resume parse.',
          },
        ],
      },
      include: { candidate: true, job: true },
    });

    return application;
  }

  async findAll(tenantId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    return this.prisma.candidateProfile.findMany({
      where,
      include: { documents: true, applications: { include: { job: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const candidate = await this.prisma.candidateProfile.findUnique({
      where: { id },
      include: { documents: true, applications: { include: { job: true } } },
    });
    if (!candidate) throw new NotFoundException(`Candidate with ID ${id} not found`);
    return candidate;
  }
}
