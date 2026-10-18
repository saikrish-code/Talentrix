'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { BarChart3, Sparkles, TrendingUp, Users, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function AnalyticsPage() {
  const summary = {
    timeToHireDays: 18.4,
    costPerHireUsd: 4150,
    aiAssistAdoptionPct: 91.5,
    sourceBreakdown: [
      { source: 'Career Page', count: 240, percentage: 45 },
      { source: 'LinkedIn', count: 180, percentage: 34 },
      { source: 'Referral', count: 75, percentage: 14 },
      { source: 'Direct / Sourcing', count: 35, percentage: 7 },
    ],
    conversionFunnel: [
      { stage: 'Applied', count: 530, rate: '100%' },
      { stage: 'AI Screened', count: 380, rate: '71.6%' },
      { stage: 'Shortlisted', count: 140, rate: '26.4%' },
      { stage: 'Interview', count: 55, rate: '10.3%' },
      { stage: 'Offer', count: 16, rate: '3.0%' },
      { stage: 'Hired', count: 12, rate: '2.2%' },
    ],
    recruiterWorkload: [
      { recruiter: 'Sarah Jenkins', active: 48, interviews: 12 },
      { recruiter: 'Alex Rivera', active: 36, interviews: 8 },
      { recruiter: 'Elena Rostova', active: 42, interviews: 10 },
    ],
    diversity: {
      female: '48%',
      male: '49%',
      nonBinary: '3%',
      index: 'High',
    },
    aiInsights: 'Time-to-hire for Engineering roles increased 15% this month, mainly due to interview scheduling bottlenecks in technical rounds. Career Page remains our strongest source-of-hire at 45%, while AI-assist adoption reached 91.5% across all shortlist reviews.',
  };

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sarah Jenkins">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Executive Recruitment Analytics</h1>
            <p className="text-sm text-muted-foreground">Comprehensive intelligence on velocity, funnel conversion, cost, diversity, and AI adoption.</p>
          </div>
        </div>

        {/* AI Insights Panel */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Weekly AI Insights & Bottleneck Analysis</CardTitle>
            </div>
            <CardDescription>Generated automatically from platform telemetry and hiring velocity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground">{summary.aiInsights}</p>
          </CardContent>
        </Card>

        {/* Top Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time-to-Hire</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.timeToHireDays} days</div>
              <p className="text-xs text-muted-foreground mt-1">-4.2 days vs last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cost-per-Hire</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary.costPerHireUsd}</div>
              <p className="text-xs text-muted-foreground mt-1">-8.5% efficiency gain</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">AI-Assist Adoption</CardTitle>
              <Sparkles className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.aiAssistAdoptionPct}%</div>
              <p className="text-xs text-muted-foreground mt-1">Shortlists reviewed with AI</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Diversity Index</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.diversity.index}</div>
              <p className="text-xs text-muted-foreground mt-1">Balanced candidate pipelines</p>
            </CardContent>
          </Card>
        </div>

        {/* Funnel & Source Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Conversion Funnel</CardTitle>
              <CardDescription>Candidate drop-off rates across stages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.conversionFunnel.map((step) => (
                <div key={step.stage} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{step.stage}</span>
                    <span className="font-mono">{step.count} candidates ({step.rate})</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: step.rate }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Source-of-Hire */}
          <Card>
            <CardHeader>
              <CardTitle>Source-of-Hire Breakdown</CardTitle>
              <CardDescription>Channels driving top candidate volume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.sourceBreakdown.map((src) => (
                <div key={src.source} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{src.source}</span>
                    <span className="font-mono">{src.count} hires ({src.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${src.percentage}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
