'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, Button, Input, Badge, DataTable, Avatar, AvatarFallback } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { Search, FileText, ArrowRight } from 'lucide-react';

export default function CandidatesPage() {
  const [search, setSearch] = React.useState('');

  const candidates = [
    {
      id: 'cand_1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      currentTitle: 'Senior Full Stack Engineer',
      experienceYears: 6.5,
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      matchScore: '94%',
    },
    {
      id: 'cand_2',
      name: 'Alex Rivera',
      email: 'alex.r@example.com',
      currentTitle: 'Product Manager',
      experienceYears: 5.0,
      skills: ['Roadmapping', 'Agile', 'SQL', 'User Research', 'Figma'],
      matchScore: '88%',
    },
    {
      id: 'cand_3',
      name: 'David Chen',
      email: 'david.c@example.com',
      currentTitle: 'Staff Infrastructure Engineer',
      experienceYears: 9.0,
      skills: ['Kubernetes', 'Terraform', 'Go', 'AWS', 'Datadog'],
      matchScore: '97%',
    },
  ];

  const filtered = candidates.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.currentTitle.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Candidate',
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{row.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/candidates/${row.id}`} className="font-semibold hover:underline text-primary">
              {row.name}
            </Link>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'currentTitle',
      header: 'Title & Experience',
      cell: (row: any) => (
        <div>
          <p className="text-sm">{row.currentTitle}</p>
          <p className="text-xs text-muted-foreground">{row.experienceYears} years experience</p>
        </div>
      ),
    },
    {
      key: 'skills',
      header: 'Parsed Skills',
      cell: (row: any) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {row.skills.slice(0, 4).map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'matchScore',
      header: 'AI Match',
      cell: (row: any) => <span className="font-mono font-bold text-emerald-600">{row.matchScore}</span>,
    },
    {
      key: 'actions',
      header: '',
      cell: (row: any) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/candidates/${row.id}`}>
            View Profile <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sai Krishna S">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Candidate Directory</h1>
            <p className="text-sm text-muted-foreground">AI-parsed candidate profiles, resume repository, and semantic search.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, skills, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <DataTable columns={columns} data={filtered} keyField="id" />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
