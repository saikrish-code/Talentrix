'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, DataTable, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { Sparkles, ChevronDown, ChevronUp, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.['id'] as string;

  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [drawerCandidate, setDrawerCandidate] = React.useState<any | null>(null);

  const handleEditJob = () => alert('Opening requisition edit modal...');
  const handleRefreshScoring = () => alert('AI ranking re-computed successfully using pgvector similarity.');

  // Mock job and AI shortlist data
  const job = {
    id: jobId || '1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    status: 'OPEN',
    description: 'Seeking a Senior Full Stack Engineer with expertise in React, Node.js, TypeScript, and pgvector/PostgreSQL.',
  };

  const shortlist = [
    {
      id: 'cand_1',
      name: 'Sarah Jenkins',
      title: 'Senior Full Stack Engineer at Stripe',
      similarity: 0.96,
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      breakdown: {
        skillsMatch: 95,
        experienceMatch: 92,
        educationMatch: 90,
        overallScore: 94,
        aiRationale: 'Sarah has 6.5+ years of direct experience with React, TypeScript, and Node.js. Her recent work at Stripe scaling billing microservices closely mirrors our performance requirements.',
      },
    },
    {
      id: 'cand_2',
      name: 'David Chen',
      title: 'Staff Infrastructure Engineer',
      similarity: 0.93,
      skills: ['Kubernetes', 'Terraform', 'Go', 'AWS', 'PostgreSQL'],
      breakdown: {
        skillsMatch: 88,
        experienceMatch: 95,
        educationMatch: 90,
        overallScore: 91,
        aiRationale: 'David brings exceptional infrastructure and backend scaling experience. While his primary language is Go rather than TypeScript, his robust architectural background makes him a top contender.',
      },
    },
    {
      id: 'cand_3',
      name: 'Alex Rivera',
      title: 'Product Manager',
      similarity: 0.82,
      skills: ['Roadmapping', 'Agile', 'SQL', 'User Research'],
      breakdown: {
        skillsMatch: 75,
        experienceMatch: 85,
        educationMatch: 85,
        overallScore: 81,
        aiRationale: 'Alex has solid product delivery skills, though lacks the deep hands-on frontend engineering background required for this specific technical role.',
      },
    },
  ];

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sai Krishna S">
      <div className="space-y-6">
        {/* Job Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{job.title}</h1>
              <Badge variant="success">{job.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{job.department} • Job ID: {job.id}</p>
          </div>
          <Button onClick={handleEditJob}>Edit Requisition</Button>
        </div>

        {/* AI Shortlist Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">AI Candidate Shortlist (Ranked by pgvector + LLM)</h2>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefreshScoring}>Refresh AI Scoring</Button>
          </div>

          <div className="space-y-4">
            {shortlist.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <Card key={item.id} className="transition-all hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                        <Badge variant="success" className="font-mono">{item.breakdown.overallScore}% Match</Badge>
                      </div>
                      <CardDescription>{item.title}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setDrawerCandidate(item)}>
                        Why this score?
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {isExpanded && (
                      <div className="rounded-lg bg-muted/40 p-4 border space-y-2 mt-4 text-sm animate-in fade-in-50">
                        <div className="flex items-center gap-2 font-semibold text-xs text-primary uppercase tracking-wider">
                          <ShieldCheck className="h-4 w-4" /> AI Evaluation Rationale
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item.breakdown.aiRationale}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* "Why this score?" Drawer Dialog for Transparency */}
      {drawerCandidate && (
        <Dialog open={!!drawerCandidate} onOpenChange={() => setDrawerCandidate(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> AI Match Breakdown: {drawerCandidate.name}
              </DialogTitle>
              <DialogDescription>
                Detailed scoring components and LLM reasoning for recruiter transparency.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-card">
                  <p className="text-xs text-muted-foreground">Skills Match</p>
                  <p className="text-xl font-bold font-mono">{drawerCandidate.breakdown.skillsMatch}%</p>
                </div>
                <div className="p-3 border rounded-lg bg-card">
                  <p className="text-xs text-muted-foreground">Experience Match</p>
                  <p className="text-xl font-bold font-mono">{drawerCandidate.breakdown.experienceMatch}%</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plain Language Reasoning</h4>
                <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg border">
                  {drawerCandidate.breakdown.aiRationale}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
