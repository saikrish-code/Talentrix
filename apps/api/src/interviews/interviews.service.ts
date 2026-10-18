import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiServicesService } from '../ai-services/ai-services.service';
import type { InterviewDecision } from '@prisma/client';

@Injectable()
export class InterviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiServices: AiServicesService
  ) {}

  async findAll(tenantId?: string) {
    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    return this.prisma.interview.findMany({
      where,
      include: {
        application: { include: { candidate: true, job: true } },
        scheduledBy: true,
        panel: { include: { interviewer: true } },
        feedbacks: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const interview = await this.prisma.interview.findUnique({
      where: { id },
      include: {
        application: { include: { candidate: true, job: true } },
        scheduledBy: true,
        panel: { include: { interviewer: true } },
        feedbacks: { include: { interviewer: true } },
      },
    });
    if (!interview) throw new NotFoundException(`Interview with ID ${id} not found`);
    return interview;
  }

  async generateQuestions(id: string, competencies?: string[]) {
    const interview = await this.findOne(id);
    const job = interview.application.job;
    const candidate = interview.application.candidate;

    const res = await this.aiServices.generateInterviewQuestions({
      jobTitle: job.title,
      jobDescriptionText: job.description,
      resumeText: JSON.stringify(candidate.parsedResume ?? candidate.summary),
      interviewType: interview.type,
      numberOfQuestions: 8,
    });

    const questionsList = res.questions.map((q) => q.question);

    await this.prisma.interview.update({
      where: { id },
      data: { aiGeneratedQuestions: questionsList },
    });

    return res;
  }

  async submitFeedback(id: string, interviewerId: string, dto: {
    decision: InterviewDecision;
    overallRating: number;
    technicalRating?: number;
    communicationRating?: number;
    cultureFitRating?: number;
    strengths: string;
    weaknesses: string;
    notes: string;
  }) {
    await this.findOne(id);

    return this.prisma.interviewFeedback.upsert({
      where: {
        interviewId_interviewerId: {
          interviewId: id,
          interviewerId,
        },
      },
      create: {
        interviewId: id,
        interviewerId,
        decision: dto.decision,
        overallRating: dto.overallRating,
        technicalRating: dto.technicalRating ?? null,
        communicationRating: dto.communicationRating ?? null,
        cultureFitRating: dto.cultureFitRating ?? null,
        strengths: dto.strengths,
        weaknesses: dto.weaknesses,
        notes: dto.notes,
      },
      update: {
        decision: dto.decision,
        overallRating: dto.overallRating,
        technicalRating: dto.technicalRating ?? null,
        communicationRating: dto.communicationRating ?? null,
        cultureFitRating: dto.cultureFitRating ?? null,
        strengths: dto.strengths,
        weaknesses: dto.weaknesses,
        notes: dto.notes,
      },
    });
  }

  async getPanelSummary(applicationId: string) {
    const interviews = await this.prisma.interview.findMany({
      where: { applicationId },
      include: { feedbacks: { include: { interviewer: true } } },
    });

    const allFeedbacks = interviews.flatMap((i) => i.feedbacks);
    if (allFeedbacks.length === 0) {
      return { message: 'No feedback submitted yet for this application.' };
    }

    return this.aiServices.synthesizePanelFeedback(allFeedbacks);
  }
}
