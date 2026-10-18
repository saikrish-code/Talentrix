import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(jobId?: string, tenantId?: string) {
    const where: any = {};
    if (jobId) where.jobId = jobId;
    if (tenantId) where.tenantId = tenantId;

    return this.prisma.application.findMany({
      where,
      include: { candidate: true, job: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async updateStage(id: string, status: ApplicationStatus, note?: string, userId = 'default-user') {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) throw new NotFoundException(`Application with ID ${id} not found`);

    const stageHistory = Array.isArray(app.stageHistory) ? [...app.stageHistory] : [];
    stageHistory.push({
      stage: status,
      movedById: userId,
      movedAt: new Date().toISOString(),
      note: note ?? `Moved to ${status}`,
    });

    return this.prisma.application.update({
      where: { id },
      data: {
        status,
        stageHistory: stageHistory as any,
      },
      include: { candidate: true, job: true },
    });
  }

  async bulkUpdateStage(ids: string[], status: ApplicationStatus, note?: string) {
    return this.prisma.$transaction(
      ids.map((id) =>
        this.prisma.application.update({
          where: { id },
          data: { status },
        })
      )
    );
  }
}
