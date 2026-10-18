'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Label, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { Sparkles, Save, Mail, CheckCircle2 } from 'lucide-react';

export default function EmailTemplatesPage() {
  const [activeTab, setActiveTab] = React.useState('offer');
  const [subject, setSubject] = React.useState('Offer of Employment: Senior Full Stack Engineer at Talentrix');
  const [body, setBody] = React.useState(
    `Dear [Candidate Name],\n\nWe are absolutely thrilled to offer you the position of [Job Title] at Talentrix! Your technical depth and passion for enterprise AI solutions stood out among all applicants.\n\nPlease review the attached formal offer letter and let us know by [Date] if you have any questions.\n\nWarm regards,\nThe Talentrix Recruitment Team`
  );
  const [personalizing, setPersonalizing] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handlePersonalizeAI = () => {
    setPersonalizing(true);
    setTimeout(() => {
      setPersonalizing(false);
      setSubject('Exciting News: Your Offer to Join Talentrix as Senior Full Stack Engineer');
      setBody(
        `Dear Sarah,\n\nFollowing your outstanding performance across our technical rounds and system design panel at Talentrix, we are thrilled to offer you the Senior Full Stack Engineer role.\n\nWe were especially impressed by your work scaling microservices at Stripe. We're excited for you to bring that expertise to our core platform.\n\nWarm regards,\nSai Krishna S & The Talentrix Team`
      );
    }, 1000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sai Krishna S">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Email Automation & Templates</h1>
            <p className="text-sm text-muted-foreground">Manage templated emails sent automatically upon pipeline stage changes. AI-powered personalization enabled.</p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> {saved ? 'Templates Saved!' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="offer" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="received">Application Received</TabsTrigger>
            <TabsTrigger value="interview">Interview Scheduled</TabsTrigger>
            <TabsTrigger value="offer">Offer Letter</TabsTrigger>
            <TabsTrigger value="rejection">Rejection</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="pt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="capitalize">{activeTab} Email Template</CardTitle>
                  <CardDescription>Uses Talentrix brand header and customizable placeholders.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handlePersonalizeAI} disabled={personalizing} className="gap-2 border-primary/50 text-primary">
                  <Sparkles className="h-4 w-4" /> {personalizing ? 'Personalizing with AI...' : 'Personalize with AI'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Email Body (Markdown / Plain Text)</Label>
                  <textarea
                    id="body"
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono text-xs leading-relaxed"
                  />
                </div>
                <div className="rounded-lg bg-muted/30 p-3 border text-xs text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>Emails are sent from <strong>noreply@talentrix.io</strong> with consistent enterprise branding.</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
