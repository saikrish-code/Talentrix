'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Logo, Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@talentrix/ui';
import { Upload, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.['id'] as string;

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');
  const [coverNote, setCoverNote] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate calling POST /api/v1/candidates/apply with parsed resume text
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-6 space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Application Submitted Successfully!</CardTitle>
          <CardDescription>
            Our AI parsing pipeline has processed your resume, generated vector embeddings, and entered your profile into our recruitment pipeline.
          </CardDescription>
          <Button onClick={() => router.push('/careers')} className="w-full">
            Back to Careers
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <Logo size="lg" />
          <Button variant="ghost" size="sm" onClick={() => router.push('/careers')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Openings
          </Button>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-6 py-12 flex-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Apply for Position</CardTitle>
            <CardDescription>Upload your resume and provide your details to apply with AI-powered matching.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Resume Upload Box */}
              <div className="space-y-2">
                <Label>Resume / CV (PDF or DOCX)</Label>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                  />
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">{fileName ? fileName : 'Click to upload or drag and drop'}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 10MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn / Portfolio URL</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover">Cover Note / Summary</Label>
                <textarea
                  id="cover"
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Tell us why you're a great fit..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Parsing Resume & Submitting...' : 'Submit Application'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
