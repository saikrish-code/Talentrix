'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, DataTable } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { CalendarDays, Clock, Plus, Video, ArrowRight } from 'lucide-react';

export default function InterviewsPage() {
  const [interviews, setInterviews] = React.useState([
    {
      id: 'intv_1',
      candidateName: 'Sarah Jenkins',
      jobTitle: 'Senior Full Stack Engineer',
      type: 'TECHNICAL',
      round: 2,
      scheduledAt: '2026-10-20T10:00:00Z',
      duration: '60 mins',
      status: 'SCHEDULED',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 'intv_2',
      candidateName: 'Alex Rivera',
      jobTitle: 'Product Manager, AI Platform',
      type: 'BEHAVIORAL',
      round: 1,
      scheduledAt: '2026-10-20T14:00:00Z',
      duration: '45 mins',
      status: 'SCHEDULED',
      meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
    },
    {
      id: 'intv_3',
      candidateName: 'David Chen',
      jobTitle: 'Staff Infrastructure Engineer',
      type: 'SYSTEM_DESIGN',
      round: 3,
      scheduledAt: '2026-10-18T15:00:00Z',
      duration: '60 mins',
      status: 'COMPLETED',
      meetingUrl: 'https://meet.google.com/lmn-opqr-stu',
    },
  ]);

  const columns = [
    {
      key: 'candidateName',
      header: 'Candidate & Role',
      cell: (row: any) => (
        <div>
          <Link href={`/interviews/${row.id}`} className="font-semibold text-primary hover:underline">
            {row.candidateName}
          </Link>
          <p className="text-xs text-muted-foreground">{row.jobTitle}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Interview Type',
      cell: (row: any) => (
        <div>
          <Badge variant="outline">{row.type} (Round {row.round})</Badge>
          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {row.duration}
          </p>
        </div>
      ),
    },
    {
      key: 'scheduledAt',
      header: 'Scheduled Time (UTC)',
      cell: (row: any) => <span className="font-mono text-xs">{new Date(row.scheduledAt).toUTCString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: any) => (
        <Badge variant={row.status === 'COMPLETED' ? 'success' : 'default'}>{row.status}</Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          {row.meetingUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={row.meetingUrl} target="_blank" rel="noreferrer">
                <Video className="mr-1 h-3.5 w-3.5" /> Join Meet
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/interviews/${row.id}`}>
              Kit & Scorecard <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sarah Jenkins">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Interview Calendar & Scheduling</h1>
            <p className="text-sm text-muted-foreground">Unified calendar view across all open roles, automated reminders, and self-scheduling links.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Schedule Interview
          </Button>
        </div>

        {/* Unified Calendar View */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <CardTitle>Upcoming & Completed Sessions</CardTitle>
            </div>
            <Badge variant="outline">Google & Outlook Calendar API Connected</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={columns} data={interviews} keyField="id" />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
