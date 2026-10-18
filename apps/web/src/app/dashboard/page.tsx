'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, StatusBadge, DataTable } from '@talentrix/ui';
import { UserRole, ApplicationStatus } from '@talentrix/shared-types';
import { Users, Briefcase, CalendarCheck, Sparkles, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [role, setRole] = React.useState<UserRole>(UserRole.ADMIN);

  interface CandidateRow {
    id: string;
    candidate: string;
    role: string;
    status: ApplicationStatus;
    score: string;
  }

  const applications: CandidateRow[] = [
    { id: '1', candidate: 'Sarah Jenkins', role: 'Senior Full Stack', status: ApplicationStatus.INTERVIEW, score: '94%' },
    { id: '2', candidate: 'Alex Rivera', role: 'Product Manager', status: ApplicationStatus.SHORTLISTED, score: '88%' },
    { id: '3', candidate: 'David Chen', role: 'Staff Infrastructure', status: ApplicationStatus.OFFER, score: '97%' },
    { id: '4', candidate: 'Elena Rostova', role: 'Frontend Engineer', status: ApplicationStatus.SCREENING, score: '82%' },
  ];

  const columns = [
    { key: 'candidate', header: 'Candidate' },
    { key: 'role', header: 'Position' },
    { key: 'status', header: 'Status', cell: (row: CandidateRow) => <StatusBadge status={row.status} /> },
    { key: 'score', header: 'AI Match' },
  ];

  return (
    <AppShell userRole={role} userName="Sai Krishna S" userEmail="sai@talentrix.io">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Talent Acquisition Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of active requisitions, pipeline velocity, and AI candidate matching.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Preview Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.HR_MANAGER}>HR Manager</option>
              <option value={UserRole.RECRUITER}>Recruiter</option>
              <option value={UserRole.HIRING_MANAGER}>Hiring Manager</option>
              <option value={UserRole.INTERVIEWER}>Interviewer</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Requisitions</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">+2 opened this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Candidates in Pipeline</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground mt-1">94 parsed via AI today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Interviews</CardTitle>
              <CalendarCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">12 pending feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time-to-Hire</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.4 days</div>
              <p className="text-xs text-muted-foreground mt-1">-4.2 days vs last quarter</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Pipeline Applications</CardTitle>
                  <CardDescription>Top candidates moving through screening and interview stages</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={applications} keyField="id" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">AI Sourcing Insights</CardTitle>
                </div>
                <CardDescription>Semantic matching and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-background p-3 border space-y-1">
                  <p className="text-xs font-semibold">High Match Alert</p>
                  <p className="text-xs text-muted-foreground">
                    David Chen has a 97% vector match for Staff Infrastructure. Offer letter ready for approval.
                  </p>
                </div>
                <div className="rounded-lg bg-background p-3 border space-y-1">
                  <p className="text-xs font-semibold">Talent Pool Gap</p>
                  <p className="text-xs text-muted-foreground">
                    Senior Frontend role has 42 applicants but low diversity in senior Rust background. Consider sourcing channels.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
