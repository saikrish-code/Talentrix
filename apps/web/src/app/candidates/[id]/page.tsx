'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Avatar, AvatarFallback } from '@talentrix/ui';
import { UserRole, ApplicationStatus } from '@talentrix/shared-types';
import { FileText, Mail, Phone, MapPin, Linkedin, Github, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params?.['id'] as string;

  // Mock candidate profile data
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
          {/* Left: AI Parsed Profile Data */}
          <div className="space-y-6">
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

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Education</h3>
                  {candidate.education.map((edu, i) => (
                    <div key={i} className="space-y-0.5">
                      <p className="text-sm font-semibold">{edu.degree}, {edu.field}</p>
                      <p className="text-xs text-muted-foreground">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
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
