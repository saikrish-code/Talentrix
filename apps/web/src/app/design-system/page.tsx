'use client';

import * as React from 'react';
import {
  Logo,
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  StatusBadge,
  RoleBadge,
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Avatar,
  AvatarFallback,
  AvatarImage,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  DataTable,
} from '@talentrix/ui';
import { UserRole, ApplicationStatus } from '@talentrix/shared-types';
import { MoreHorizontal, Plus, Search, CheckCircle2, Shield, Mail, Calendar } from 'lucide-react';

interface CandidateRow {
  id: string;
  name: string;
  role: string;
  status: ApplicationStatus;
  score: string;
}

export default function DesignSystemPage() {
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Sample data for DataTable demo
  const columns = [
    { key: 'name', header: 'Candidate' },
    { key: 'role', header: 'Role Applied' },
    {
      key: 'status',
      header: 'Status',
      cell: (row: CandidateRow) => <StatusBadge status={row.status} />,
    },
    { key: 'score', header: 'Match Score' },
  ];

  const data: CandidateRow[] = [
    { id: '1', name: 'Sarah Jenkins', role: 'Senior Full Stack Engineer', status: ApplicationStatus.INTERVIEW, score: '94%' },
    { id: '2', name: 'Alex Rivera', role: 'Product Manager', status: ApplicationStatus.SHORTLISTED, score: '88%' },
    { id: '3', name: 'David Chen', role: 'Staff Infrastructure Engineer', status: ApplicationStatus.OFFER, score: '97%' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header bar with Logo */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Logo size="lg" />
            <span className="text-xs font-mono uppercase tracking-widest bg-muted px-2.5 py-1 rounded-md text-muted-foreground font-semibold">
              Design System & Component Library
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setCommandOpen(true)}>
              <Search className="mr-2 h-4 w-4" /> Quick Search (Cmd+K)
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Job Posting
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-10 space-y-16">
        {/* Intro */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">Talentrix Enterprise Design System</h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            A minimal, data-dense, flat enterprise design system engineered for high-throughput recruitment and HR operations. Built with zero decorative gradients, no heavy shadows, crisp 8px grid spacing, and distinct semantic states.
          </p>
        </section>

        {/* 1. Logo Wordmark */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">1. Typography & Logo Wordmark</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Wordmark (Large)</CardTitle>
              </CardHeader>
              <CardContent>
                <Logo size="lg" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Wordmark (Medium)</CardTitle>
              </CardHeader>
              <CardContent>
                <Logo size="md" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Wordmark (Small)</CardTitle>
              </CardHeader>
              <CardContent>
                <Logo size="sm" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2 pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Type Scale (Grotesque Sans)</h3>
            <div className="space-y-2 border rounded-lg p-6 bg-card">
              <div className="text-3xl font-bold tracking-tight">32px — H1 / Page Title</div>
              <div className="text-2xl font-bold tracking-tight">24px — H2 / Section Header</div>
              <div className="text-xl font-semibold">20px — H3 / Card Title</div>
              <div className="text-base font-medium">16px — Body Regular / Interactive</div>
              <div className="text-sm font-normal">14px — UI Secondary / Table Data (Default)</div>
              <div className="text-xs font-mono text-muted-foreground">12px — Meta / Badges / Captions (Mono / Sans)</div>
            </div>
          </div>
        </section>

        {/* 2. Color Palette & Status Semantics */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">2. Color Palette & Semantic Status Colors</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg border bg-background space-y-2">
              <div className="h-10 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-mono font-medium">Primary Accent</div>
              <p className="text-xs text-muted-foreground">Confident Enterprise Blue / Cobalt</p>
            </div>
            <div className="p-4 rounded-lg border bg-card space-y-2">
              <div className="h-10 rounded border bg-card text-card-foreground flex items-center justify-center text-xs font-mono font-medium">Surface / Card</div>
              <p className="text-xs text-muted-foreground">Clean flat card background</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted space-y-2">
              <div className="h-10 rounded bg-muted-foreground/20 flex items-center justify-center text-xs font-mono font-medium">Muted / Border</div>
              <p className="text-xs text-muted-foreground">Subtle neutral borders</p>
            </div>
            <div className="p-4 rounded-lg border bg-destructive/10 space-y-2">
              <div className="h-10 rounded bg-destructive flex items-center justify-center text-destructive-foreground text-xs font-mono font-medium">Destructive</div>
              <p className="text-xs text-muted-foreground">Errors / Rejections / Danger</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-medium text-muted-foreground">Recruitment Status Semantics</h3>
            <div className="flex flex-wrap gap-3 p-4 rounded-lg border bg-card items-center">
              <StatusBadge status={ApplicationStatus.APPLIED} />
              <StatusBadge status={ApplicationStatus.SCREENING} />
              <StatusBadge status={ApplicationStatus.SHORTLISTED} />
              <StatusBadge status={ApplicationStatus.INTERVIEW} />
              <StatusBadge status={ApplicationStatus.OFFER} />
              <StatusBadge status={ApplicationStatus.HIRED} />
              <StatusBadge status={ApplicationStatus.REJECTED} />
              <StatusBadge status={ApplicationStatus.WITHDRAWN} />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-medium text-muted-foreground">User Roles</h3>
            <div className="flex flex-wrap gap-3 p-4 rounded-lg border bg-card items-center">
              <RoleBadge role={UserRole.ADMIN} />
              <RoleBadge role={UserRole.HR_MANAGER} />
              <RoleBadge role={UserRole.RECRUITER} />
              <RoleBadge role={UserRole.HIRING_MANAGER} />
              <RoleBadge role={UserRole.INTERVIEWER} />
              <RoleBadge role={UserRole.CANDIDATE} />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tags / Chips</h3>
            <div className="flex flex-wrap gap-2 p-4 rounded-lg border bg-card items-center">
              <Badge variant="default">Full-Time</Badge>
              <Badge variant="secondary">Remote</Badge>
              <Badge variant="outline">Engineering</Badge>
              <Badge variant="info">Senior Level</Badge>
              <Badge variant="warning">Urgent</Badge>
            </div>
          </div>
        </section>

        {/* 3. Buttons & Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">3. Buttons</h2>
          <div className="flex flex-wrap gap-4 p-6 rounded-lg border bg-card items-center">
            <Button>Default Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small Size</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* 4. Form Inputs & Selects */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">4. Inputs, Selects & Avatars</h2>
          <div className="grid gap-6 md:grid-cols-3 p-6 rounded-lg border bg-card items-start">
            <div className="space-y-2">
              <Label htmlFor="email">Candidate Email</Label>
              <Input id="email" placeholder="candidate@domain.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">Search Position</Label>
              <Input id="search" placeholder="e.g. Senior Frontend..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="select-role">Department Select</Label>
              <Select>
                <SelectTrigger id="select-role">
                  <SelectValue placeholder="Select department..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="sales">Sales & Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-3 pt-2">
              <Label>Avatars</Label>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Recruiter" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Cards & Data Display */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">5. Cards & Metrics</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Openings</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">+3 opened this week across 4 tenants</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Candidates in Pipeline</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground mt-1">84 scheduled interviews today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Resume Parsing Match</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.4%</div>
                <p className="text-xs text-muted-foreground mt-1">Average parsing accuracy via vector embeddings</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Progress & Indicators */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">6. Progress & Indicators</h2>
          <div className="p-6 rounded-lg border bg-card space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hiring Pipeline Target (Q4)</span>
                <span className="font-mono">78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Candidate Response Rate</span>
                <span className="font-mono">92%</span>
              </div>
              <Progress value={92} />
            </div>
          </div>
        </section>

        {/* 7. Tabs, Dropdowns & Modals */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">7. Tabs, Dropdowns & Modals</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs Navigation</CardTitle>
                <CardDescription>Switch between view scopes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Candidates</TabsTrigger>
                    <TabsTrigger value="interviews">Interviews</TabsTrigger>
                    <TabsTrigger value="offers">Offers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="py-4 text-sm text-muted-foreground">
                    Showing all active candidate profiles across active job postings.
                  </TabsContent>
                  <TabsContent value="interviews" className="py-4 text-sm text-muted-foreground">
                    Scheduled technical and behavioral interview sessions.
                  </TabsContent>
                  <TabsContent value="offers" className="py-4 text-sm text-muted-foreground">
                    Pending and accepted formal job offers.
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Dropdown & Modal */}
            <Card>
              <CardHeader>
                <CardTitle>Actions & Modals</CardTitle>
                <CardDescription>Context menus and dialog workflows</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="mr-2 h-4 w-4" /> Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Candidate Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    <DropdownMenuItem>View Parsed Resume</DropdownMenuItem>
                    <DropdownMenuItem>Send Offer Letter</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Reject Candidate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Modal Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Candidate Interview</DialogTitle>
                      <DialogDescription>
                        Select date and panel members for technical round 2.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Interviewer</Label>
                        <Input placeholder="Search interviewer..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Confirm Schedule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 8. Table & Command Palette */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">8. Data Table & Command Palette</h2>
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications Table</CardTitle>
              <CardDescription>Data-dense layout optimised for 6-hour daily usage</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} keyField="id" />
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Command Palette Modal */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search candidates, jobs..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Navigation">
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Calendar className="mr-2 h-4 w-4" /> View Interview Schedule
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Shield className="mr-2 h-4 w-4" /> Manage Candidates
            </CommandItem>
            <CommandItem onSelect={() => setCommandOpen(false)}>
              <Mail className="mr-2 h-4 w-4" /> Email Templates
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
