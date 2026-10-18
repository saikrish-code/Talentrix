'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Avatar, AvatarFallback } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { FileText, Download, Sparkles, CheckCircle2, AlertCircle, Clock, DollarSign, ThumbsUp, PauseCircle, XCircle, Users, AlertTriangle } from 'lucide-react';

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params?.['id'] as string;

  const [recruiterDecision, setRecruiterDecision] = React.useState<string | null>(null);

  // Mock candidate profile data including panel summary
  const candidate = {
    id: id || 'cand_1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/sarahjenkins',
    githubUrl: 'https://github.com/sarahjenkins',
    currentTitle: 'Senior Full Stack Engineer',
    currentCompany: 'Stripe',
    totalExperienceYears: 6.5,
    summary: 'Senior Full Stack Engineer with 6.5+ years of experience architecting high-throughput distributed systems, React frontends, and cloud-native microservices.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'GraphQL', 'Docker', 'Redis'],
    experience: [
      {
        company: 'Stripe',
        title: 'Senior Software Engineer',
        startDate: '2022-03',
        endDate: null,
        description: 'Led core billing microservices migration, reducing latency by 35%. Mentored 4 junior engineers.',
      },
      {
        company: 'Datadog',
        title: 'Software Engineer',
        startDate: '2019-08',
        endDate: '2022-02',
        description: 'Developed real-time dashboard analytics features using React, TypeScript, and Go.',
      },
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2015',
        endDate: '2019',
        gpa: 3.85,
      },
    ],
    prescreenSummary: {
      keyStrengths: ['Deep expertise in React & TypeScript architecture', 'Direct experience scaling microservices at Stripe', 'Excellent asynchronous communication'],
      concerns: ['Slightly higher salary expectation than baseline ($185k)'],
      availability: '2 weeks notice',
      salaryExpectation: '$180,000 / yr',
      suggestion: 'RECOMMEND',
      rationale: 'Candidate successfully completed async pre-screening and demonstrated exceptional clarity on distributed systems design.',
    },
    panelSummary: {
      consensusStrengths: ['Exceptional system design and problem solving', 'Strong cultural alignment and mentorship capability'],
      consensusWeaknesses: ['Minor hesitation on database sharding trade-offs'],
      agreementAreas: ['Unanimous praise for coding standards and communication skills'],
      disagreementAreas: ['Interviewer A rated System Design 5/5, while Interviewer B rated it 3/5 citing architectural depth.'],
      overallRecommendation: 'YES',
      divergenceFlag: true,
      debriefPrompt: 'Score divergence detected (ratings span 2 points on technical depth). Schedule a 30-minute debrief meeting before issuing offer.',
    },
  };

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sarah Jenkins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg">{candidate.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">{candidate.name}</h1>
                <Badge variant="success">AI Match: 94%</Badge>
                {recruiterDecision && (
                  <Badge variant={recruiterDecision === 'RECOMMEND' ? 'success' : recruiterDecision === 'HOLD' ? 'warning' : 'destructive'}>
                    Recruiter Status: {recruiterDecision}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{candidate.currentTitle} at {candidate.currentCompany} • {candidate.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download Resume PDF
            </Button>
            <Button size="sm">Schedule Interview</Button>
          </div>
        </div>

        {/* Side-by-Side View */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: AI Pre-Screen Summary, Panel Summary & Parsed Profile */}
          <div className="space-y-6">
            {/* Panel Summary Card */}
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-base">Panel Summary & Interview Synthesis</CardTitle>
                  </div>
                  <Badge variant="warning">Consensus: {candidate.panelSummary.overallRecommendation}</Badge>
                </div>
                <CardDescription>Synthesized from all completed interviewer scorecards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {candidate.panelSummary.divergenceFlag && (
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-700">Divergence Flagged</p>
                      <p className="text-xs text-muted-foreground">{candidate.panelSummary.debriefPrompt}</p>
                      <Button size="sm" variant="outline" className="mt-2 text-xs bg-background">
                        Schedule Debrief Meeting
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Agreement Areas</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {candidate.panelSummary.agreementAreas.map((a, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disagreement / Divergence Areas</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {candidate.panelSummary.disagreementAreas.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* AI Pre-Screen Summary Card */}
            <Card className="border-primary/40 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">AI Pre-Screen Summary</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono bg-background">AI Generated • Requires Recruiter Sign-off</Badge>
                </div>
                <CardDescription>Synthesized from async chat screening transcript & resume gap analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2 bg-background p-2.5 rounded-md border">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Availability</p>
                      <p className="font-semibold">{candidate.prescreenSummary.availability}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background p-2.5 rounded-md border">
                    <DollarSign className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-muted-foreground">Salary Expectation</p>
                      <p className="font-semibold">{candidate.prescreenSummary.salaryExpectation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Strengths</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {candidate.prescreenSummary.keyStrengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Potential Concerns</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {candidate.prescreenSummary.concerns.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <p className="text-xs font-semibold">Recruiter Confirmation Required</p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={recruiterDecision === 'RECOMMEND' ? 'default' : 'outline'}
                      className="flex-1 text-xs"
                      onClick={() => setRecruiterDecision('RECOMMEND')}
                    >
                      <ThumbsUp className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Recommend
                    </Button>
                    <Button
                      size="sm"
                      variant={recruiterDecision === 'HOLD' ? 'default' : 'outline'}
                      className="flex-1 text-xs"
                      onClick={() => setRecruiterDecision('HOLD')}
                    >
                      <PauseCircle className="mr-1.5 h-3.5 w-3.5 text-amber-500" /> Hold
                    </Button>
                    <Button
                      size="sm"
                      variant={recruiterDecision === 'REJECT' ? 'destructive' : 'outline'}
                      className="flex-1 text-xs"
                      onClick={() => setRecruiterDecision('REJECT')}
                    >
                      <XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>AI Parsed Resume Profile</CardTitle>
                </div>
                <CardDescription>Structured extraction via LLM parser & pgvector embedding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Professional Summary</h3>
                  <p className="text-sm leading-relaxed">{candidate.summary}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Core Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Experience</h3>
                  {candidate.experience.map((exp, i) => (
                    <div key={i} className="border-l-2 border-primary/30 pl-4 space-y-1">
                      <p className="text-sm font-semibold">{exp.title} — <span className="text-primary">{exp.company}</span></p>
                      <p className="text-xs text-muted-foreground font-mono">{exp.startDate} - {exp.endDate ?? 'Present'}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Original Resume Preview Pane */}
          <div className="space-y-6">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">Original Document Preview</CardTitle>
                  </div>
                  <Badge variant="outline">PDF • 245 KB</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 flex flex-col items-center justify-center bg-muted/20 min-h-[500px] border-b">
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-background border shadow-sm">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Sarah_Jenkins_Resume_2026.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded via Career Portal on Oct 18, 2026</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    Open Fullscreen PDF Viewer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
