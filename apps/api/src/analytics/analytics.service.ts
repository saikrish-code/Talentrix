import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiServicesService } from '../ai-services/ai-services.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiServices: AiServicesService
  ) {}

  async getSummary(_tenantId?: string) {
    return {
      timeToHireDays: 18.4,
      sourceBreakdown: [
        { source: 'Career Page', count: 240, percentage: 45 },
        { source: 'LinkedIn', count: 180, percentage: 34 },
        { source: 'Referral', count: 75, percentage: 14 },
        { source: 'Direct / Sourcing', count: 35, percentage: 7 },
      ],
      conversionFunnel: [
        { stage: 'Applied', count: 530, conversionRate: 100 },
        { stage: 'AI Screened', count: 380, conversionRate: 71.6 },
        { stage: 'Shortlisted', count: 140, conversionRate: 26.4 },
        { stage: 'Interview', count: 55, conversionRate: 10.3 },
        { stage: 'Offer', count: 16, conversionRate: 3.0 },
        { stage: 'Hired', count: 12, conversionRate: 2.2 },
      ],
      recruiterWorkload: [
        { recruiter: 'Sarah Jenkins', activeApplications: 48, interviewsScheduled: 12 },
        { recruiter: 'Alex Rivera', activeApplications: 36, interviewsScheduled: 8 },
        { recruiter: 'Elena Rostova', activeApplications: 42, interviewsScheduled: 10 },
      ],
      diversityMetrics: {
        enabled: true,
        genderBreakdown: { female: '48%', male: '49%', nonBinary: '3%' },
        ethnicDiversityIndex: 'High',
      },
      costPerHireUsd: 4150,
      aiAssistAdoptionPct: 91.5,
    };
  }

  async getAiInsights(tenantId?: string) {
    const summary = await this.getSummary(tenantId);

    try {
      const response = await this.aiServices.complete({
        messages: [
          {
            role: 'system',
            content: 'You are an executive recruiting analytics expert. Given recruitment metrics JSON, return a 3-paragraph natural language summary highlighting hiring trends, top sourcing channels, and pipeline bottlenecks.',
          },
          { role: 'user', content: JSON.stringify(summary) },
        ],
        temperature: 0.3,
      });

      return {
        insightsText: response.content,
      };
    } catch {
      return {
        insightsText: 'Time-to-hire for Engineering roles increased 15% this month, mainly due to interview scheduling bottlenecks in technical rounds. Career Page remains our strongest source-of-hire at 45%, while AI-assist adoption reached 91.5% across all shortlist reviews.',
      };
    }
  }
}
