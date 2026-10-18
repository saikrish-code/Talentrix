import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiServicesService } from '../ai-services/ai-services.service';
import { InterviewStatus, InterviewType } from '@prisma/client';

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

  async getCalendarEvents(tenantId?: string) {
    const interviews = await this.findAll(tenantId);
    return interviews.map((intv) => {
      const slot = intv.slot as any;
      return {
        id: intv.id,
        title: `${intv.type} — ${intv.application.candidate.firstName} ${intv.application.candidate.lastName} (${intv.application.job.title})`,
        start: slot?.startAt ?? new Date().toISOString(),
        end: slot?.endAt ?? new Date(Date.now() + 3600000).toISOString(),
        status: intv.status,
        meetingUrl: slot?.meetingUrl ?? 'https://meet.google.com/abc-xyz-pqr',
        candidateName: `${intv.application.candidate.firstName} ${intv.application.candidate.lastName}`,
        jobTitle: intv.application.job.title,
      };
    });
  }

  async getAvailableSlots(_panelIds: string[], date: string) {
    return [
      { start: `${date}T09:00:00Z`, end: `${date}T10:00:00Z`, timezone: 'UTC' },
      { start: `${date}T11:00:00Z`, end: `${date}T12:00:00Z`, timezone: 'UTC' },
      { start: `${date}T14:00:00Z`, end: `${date}T15:00:00Z`, timezone: 'UTC' },
      { start: `${date}T16:00:00Z`, end: `${date}T17:00:00Z`, timezone: 'UTC' },
    ];
  }

  async scheduleInterview(dto: {
    applicationId: string;
    type: InterviewType;
    round: number;
    slot: { startAt: string; endAt: string; timezone: string; meetingUrl?: string };
    panelInterviewerIds: string[];
    scheduledById: string;
    tenantId?: string;
  }) {
    const tenantId = dto.tenantId ?? 'default-tenant';

    const interview = await this.prisma.interview.create({
      data: {
        applicationId: dto.applicationId,
        type: dto.type,
        round: dto.round ?? 1,
        status: InterviewStatus.SCHEDULED,
        slot: dto.slot as any,
        calendarEventId: `cal_evt_${Math.random().toString(36).substring(7)}`,
        tenantId,
        scheduledById: dto.scheduledById,
        panel: {
          create: dto.panelInterviewerIds.map((id) => ({
            interviewerId: id,
          })),
        },
      },
      include: {
        application: { include: { candidate: true, job: true } },
        panel: { include: { interviewer: true } },
      },
    });

    console.log(`📧 [Email Service] Sending interview invitation to ${interview.application.candidate.email} for ${interview.application.job.title}`);
    return interview;
  }

  async reschedule(id: string, newSlot: { startAt: string; endAt: string; timezone: string }) {
    const interview = await this.findOne(id);
    const updated = await this.prisma.interview.update({
      where: { id },
      data: {
        slot: newSlot as any,
        status: InterviewStatus.RESCHEDULED,
      },
      include: { application: { include: { candidate: true, job: true } } },
    });

    console.log(`📧 [Email Service] Sending reschedule notice to ${updated.application.candidate.email}`);
    return updated;
  }

  async cancel(id: string, reason?: string) {
    const interview = await this.findOne(id);
    const updated = await this.prisma.interview.update({
      where: { id },
      data: {
        status: InterviewStatus.CANCELLED,
      },
      include: { application: { include: { candidate: true, job: true } } },
    });

    console.log(`📧 [Email Service] Sending cancellation notice (Reason: ${reason ?? 'Role filled/cancelled'}) to ${updated.application.candidate.email}`);
    return updated;
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

  async generateQuestions(id: string, _competencies?: string[]) {
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
    decision: any;
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
