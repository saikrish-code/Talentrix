'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Label, Tabs, TabsList, TabsTrigger, TabsContent, Badge, DataTable } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { Shield, Sparkles, Sliders, Users, FileText, Trash2, Palette, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  // AI Config sliders state
  const [skillsWeight, setSkillsWeight] = React.useState(40);
  const [expWeight, setExpWeight] = React.useState(35);
  const [seniorityWeight, setSeniorityWeight] = React.useState(25);
  const [provider, setProvider] = React.useState('anthropic');

  // White label branding state
  const [accentColor, setAccentColor] = React.useState('#2563eb');
  const [companyName, setCompanyName] = React.useState('Acme Corp');

  // GDPR PII Deletion state
  const [deleteEmail, setDeleteEmail] = React.useState('');
  const [deletedStatus, setDeletedStatus] = React.useState(false);

  // Audit log mock data
  const auditLogs = [
    { id: 'log_1', user: 'Sai Krishna S (Recruiter)', action: 'Accepted AI Shortlist', candidate: 'Sarah Jenkins', job: 'Senior Full Stack', timestamp: '2026-10-18 10:30 UTC' },
    { id: 'log_2', user: 'David Chen (Hiring Manager)', action: 'Overrode AI Recommendation', candidate: 'Alex Rivera', job: 'Product Manager', timestamp: '2026-10-17 14:15 UTC' },
    { id: 'log_3', user: 'Sai Krishna S (Recruiter)', action: 'Accepted AI Pre-Screen', candidate: 'David Chen', job: 'Staff Infrastructure', timestamp: '2026-10-16 09:45 UTC' },
  ];

  const auditColumns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'user', header: 'Actor & Role' },
    { key: 'action', header: 'Decision Action', cell: (row: any) => <Badge variant={row.action.includes('Override') ? 'warning' : 'success'}>{row.action}</Badge> },
    { key: 'candidate', header: 'Candidate' },
    { key: 'job', header: 'Job Requisition' },
  ];

  const handleGdprDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteEmail) return;
    setDeletedStatus(true);
    setTimeout(() => {
      setDeletedStatus(false);
      setDeleteEmail('');
    }, 4000);
  };

  const handleSaveAi = () => alert('AI model provider and matching weights saved successfully.');
  const handleInviteUser = () => alert('Invitation email sent to new team member.');
  const handleSaveBranding = () => alert('White-label tenant branding updated successfully.');

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sai Krishna S">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Enterprise Settings & Administration</h1>
            <p className="text-sm text-muted-foreground">Manage user roles, AI provider scoring weights, compliance audit logs, GDPR data retention, and white-label branding.</p>
          </div>
        </div>

        <Tabs defaultValue="ai-config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-4xl">
            <TabsTrigger value="ai-config">AI & Scoring Config</TabsTrigger>
            <TabsTrigger value="audit-log">AI Compliance Audit Log</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="gdpr">Data Privacy & GDPR</TabsTrigger>
            <TabsTrigger value="branding">White-Label Branding</TabsTrigger>
          </TabsList>

          {/* 1. AI & Scoring Config */}
          <TabsContent value="ai-config">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>AI Model Provider & Scoring Weights</CardTitle>
                </div>
                <CardDescription>Configure the underlying LLM orchestration layer and candidate matching weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary LLM Provider</Label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="flex h-9 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
                    <option value="openai">OpenAI GPT-4o</option>
                    <option value="google">Google Gemini 1.5 Pro</option>
                    <option value="azure">Azure OpenAI Enterprise</option>
                    <option value="ollama">Ollama (Local LLM)</option>
                  </select>
                </div>

                <div className="space-y-4 pt-4 border-t max-w-md">
                  <h3 className="text-sm font-semibold">Match Scoring Weights (Total: {skillsWeight + expWeight + seniorityWeight}%)</h3>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Skills Match Weight</span>
                      <span className="font-mono">{skillsWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skillsWeight}
                      onChange={(e) => setSkillsWeight(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Experience Relevance Weight</span>
                      <span className="font-mono">{expWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={expWeight}
                      onChange={(e) => setExpWeight(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Seniority Fit Weight</span>
                      <span className="font-mono">{seniorityWeight}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={seniorityWeight}
                      onChange={(e) => setSeniorityWeight(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <Button className="mt-4" onClick={handleSaveAi}>Save AI Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. AI Compliance Audit Log */}
          <TabsContent value="audit-log">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>AI-Assisted Decision Audit Trail</CardTitle>
                </div>
                <CardDescription>Regulatory compliance log tracking every AI shortlist recommendation accepted or overridden by recruiters</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable columns={auditColumns} data={auditLogs} keyField="id" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. Users & Roles */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>User & Role Management</CardTitle>
                </div>
                <CardDescription>Configure team access across Admin, HR Manager, Recruiter, and Hiring Manager roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
                  <div>
                    <p className="text-sm font-semibold">Sai Krishna S</p>
                    <p className="text-xs text-muted-foreground">sai@talentrix.io • Admin & Recruiter</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
                  <div>
                    <p className="text-sm font-semibold">David Chen</p>
                    <p className="text-xs text-muted-foreground">david@talentrix.io • Hiring Manager (Engineering)</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={handleInviteUser}>+ Invite New User</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. Data Privacy & GDPR */}
          <TabsContent value="gdpr">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <CardTitle>Candidate PII & GDPR Right-to-Delete</CardTitle>
                </div>
                <CardDescription>Permanently purge candidate resumes, documents, vector embeddings, and profile data upon request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                {deletedStatus && (
                  <div className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-600 font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Candidate PII permanently purged across database and vector store.
                  </div>
                )}
                <form onSubmit={handleGdprDelete} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="gdprEmail">Candidate Email Address</Label>
                    <Input
                      id="gdprEmail"
                      type="email"
                      placeholder="candidate@domain.com"
                      value={deleteEmail}
                      onChange={(e) => setDeleteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button variant="destructive" type="submit">
                    Purge Candidate Data (GDPR Right-to-Delete)
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 5. White-Label Branding */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle>White-Label Client Branding</CardTitle>
                </div>
                <CardDescription>Customize company name, logo wordmark, and primary accent color override per client tenant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Tenant Name</Label>
                  <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent">Primary Accent Color (Hex Code)</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="accent"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-16 rounded border cursor-pointer"
                    />
                    <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                  </div>
                </div>
                <Button className="mt-2" onClick={handleSaveBranding}>Save Branding Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
