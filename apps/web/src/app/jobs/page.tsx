'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Badge,
  DataTable,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@talentrix/ui';
import { JobStatus, WorkMode, EmploymentType, SeniorityLevel, UserRole } from '@talentrix/shared-types';
import { Plus, Search, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = React.useState([
    {
      id: '1',
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: { city: 'San Francisco', country: 'USA' },
      workMode: WorkMode.HYBRID,
      employmentType: EmploymentType.FULL_TIME,
      seniority: SeniorityLevel.SENIOR,
      status: JobStatus.OPEN,
      openings: 2,
      createdAt: '2026-10-01',
    },
    {
      id: '2',
      title: 'Product Manager, AI Platform',
      department: 'Product',
      location: { city: 'New York', country: 'USA' },
      workMode: WorkMode.REMOTE,
      employmentType: EmploymentType.FULL_TIME,
      seniority: SeniorityLevel.LEAD,
      status: JobStatus.DRAFT,
      openings: 1,
      createdAt: '2026-10-10',
    },
    {
      id: '3',
      title: 'Staff Infrastructure Engineer',
      department: 'Engineering',
      location: { city: 'Austin', country: 'USA' },
      workMode: WorkMode.ONSITE,
      employmentType: EmploymentType.FULL_TIME,
      seniority: SeniorityLevel.STAFF,
      status: JobStatus.OPEN,
      openings: 1,
      createdAt: '2026-09-15',
    },
  ]);

  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [createOpen, setCreateOpen] = React.useState(false);

  // New job form state
  const [newTitle, setNewTitle] = React.useState('');
  const [newDept, setNewDept] = React.useState('');
  const [newSalary, setNewSalary] = React.useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const created = {
      id: String(jobs.length + 1),
      title: newTitle,
      department: newDept || 'Engineering',
      location: { city: 'Remote', country: 'USA' },
      workMode: WorkMode.REMOTE,
      employmentType: EmploymentType.FULL_TIME,
      seniority: SeniorityLevel.SENIOR,
      status: JobStatus.DRAFT,
      openings: 1,
      createdAt: new Date().toISOString().split('T')[0] ?? '',
    };

    setJobs([created, ...jobs]);
    setNewTitle('');
    setNewDept('');
    setCreateOpen(false);
  };

  const columns = [
    {
      key: 'title',
      header: 'Requisition Title',
      cell: (row: any) => (
        <div>
          <p className="font-semibold">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.department} • {row.seniority}</p>
        </div>
      ),
    },
    {
      key: 'workMode',
      header: 'Location / Work Mode',
      cell: (row: any) => (
        <div className="text-xs">
          <p>{row.location.city}, {row.location.country}</p>
          <Badge variant="outline" className="mt-1">{row.workMode}</Badge>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Lifecycle Status',
      cell: (row: any) => {
        const variants: Record<string, string> = {
          OPEN: 'success',
          DRAFT: 'secondary',
          PAUSED: 'warning',
          CLOSED: 'destructive',
          ARCHIVED: 'outline',
        };
        return <Badge variant={(variants[row.status] as any) || 'default'}>{row.status}</Badge>;
      },
    },
    {
      key: 'openings',
      header: 'Openings',
      cell: (row: any) => <span className="font-mono">{row.openings}</span>,
    },
  ];

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sarah Jenkins">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Job Requisitions</h1>
            <p className="text-sm text-muted-foreground">Manage hiring lifecycle, approvals, and AI-powered semantic job descriptions.</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Requisition
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>New Job Requisition</DialogTitle>
                <DialogDescription>
                  Fill out initial requisition details. Vector embeddings of the JD will be generated automatically upon save.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateJob} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Staff Backend Engineer"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dept">Department</Label>
                    <Input
                      id="dept"
                      placeholder="e.g. Engineering"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Band (USD)</Label>
                    <Input
                      id="salary"
                      placeholder="e.g. $150,000 - $190,000"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save as Draft & Generate Embeddings</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by title or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            {['ALL', 'OPEN', 'DRAFT', 'CLOSED'].map((st) => (
              <Button
                key={st}
                variant={statusFilter === st ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardContent className="p-0">
            <DataTable columns={columns} data={filteredJobs} keyField="id" />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
