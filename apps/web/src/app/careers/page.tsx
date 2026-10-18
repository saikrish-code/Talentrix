'use client';

import * as React from 'react';
import { Logo, Button, Input, Card, CardHeader, CardTitle, CardDescription } from '@talentrix/ui';
import { Search, MapPin, Briefcase, Building2, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const [search, setSearch] = React.useState('');

  const publicJobs = [
    {
      id: '1',
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      salary: '$160,000 - $210,000',
    },
    {
      id: '2',
      title: 'Product Manager, AI Platform',
      department: 'Product',
      location: 'New York, NY (Remote)',
      type: 'Full-time',
      salary: '$170,000 - $220,000',
    },
    {
      id: '3',
      title: 'Staff Infrastructure Engineer',
      department: 'Engineering',
      location: 'Austin, TX (On-site)',
      type: 'Full-time',
      salary: '$180,000 - $240,000',
    },
  ];

  const filtered = publicJobs.filter(
    (j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <Logo size="lg" />
          <Button variant="outline" size="sm" asChild>
            <a href="/auth/login">Employee Sign In</a>
          </Button>
        </div>
      </header>

      <section className="bg-muted/30 py-16 border-b">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Build the Future of Enterprise AI</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join Talentrix and help us empower the world's leading enterprises with intelligent recruitment workflows.
          </p>
          <div className="relative max-w-xl mx-auto pt-4">
            <Search className="absolute left-4 top-7 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search open roles by title or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base shadow-sm"
            />
          </div>
        </div>
      </section>

      <main className="container max-w-4xl mx-auto px-6 py-12 flex-1 space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Open Positions ({filtered.length})</h2>
        <div className="space-y-4">
          {filtered.map((job) => (
            <Card key={job.id} className="transition-all hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg hover:text-primary cursor-pointer">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.type}</span>
                  </CardDescription>
                </div>
                <Button size="sm">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Talentrix Inc. All rights reserved.
      </footer>
    </div>
  );
}
