'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Label, Input } from '@talentrix/ui';
import { UserRole } from '@talentrix/shared-types';
import { Sparkles, Calendar, User, Briefcase, CheckCircle2, Star, Save } from 'lucide-react';

export default function InterviewKitPage() {
  const params = useParams();
  const id = params?.['id'] as string;

  const [competencies, setCompetencies] = React.useState(['System Design', 'Leadership', 'Clean Code']);
  const [generating, setGenerating] = React.useState(false);
  const [questions, setQuestions] = React.useState([
    {
      id: 'q1',
      category: 'Technical',
      question: 'How would you design a distributed rate limiter for high-traffic API endpoints?',
      expected: 'Discusses Redis token bucket algorithms, sliding windows, and distributed consistency.',
      interviewerNote: '',
      score: 5,
    },
    {
      id: 'q2',
      category: 'Behavioral',
      question: 'Describe a time when you disagreed with a senior technical decision. How did you resolve it?',
      expected: 'Uses STAR method, emphasizes data-driven argumentation and constructive collaboration.',
      interviewerNote: '',
      score: 4,
    },
    {
      id: 'q3',
      category: 'System Design',
      question: 'How do you handle zero-downtime database migrations with pgvector or large relational tables?',
      expected: 'Covers expand/contract migration patterns, dual writes, and backward compatibility.',
      interviewerNote: '',
      score: 5,
    },
  ]);

  // Scorecard state
  const [techRating, setTechRating] = React.useState(5);
  const [commRating, setCommRating] = React.useState(4);
  const [cultureRating, setCultureRating] = React.useState(5);
  const [strengths, setStrengths] = React.useState('Deep distributed systems experience and articulate communication.');
  const [weaknesses, setWeaknesses] = React.useState('None noted during this technical round.');
  const [decision, setDecision] = React.useState('STRONG_YES');
  const [saved, setSaved] = React.useState(false);

  const handleRegenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 1000);
  };

  const handleSaveScorecard = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sarah Jenkins">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Interview Kit & Scorecard</h1>
              <Badge variant="success">Technical Round 2</Badge>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-4 mt-1">
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> Candidate: Sarah Jenkins</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> Role: Senior Full Stack Engineer</span>
            </p>
          </div>
          <Button onClick={handleSaveScorecard} className="gap-2">
            <Save className="h-4 w-4" /> {saved ? 'Scorecard Saved!' : 'Save Scorecard'}
          </Button>
        </div>

        {/* Competency Selection & AI Generation Bar */}
        <Card className="bg-muted/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">AI Interview Question Generator</CardTitle>
              </div>
              <Button size="sm" onClick={handleRegenerate} disabled={generating}>
                {generating ? 'Regenerating...' : 'Regenerate Questions'}
              </Button>
            </div>
            <CardDescription>Tailored to JD requirements and candidate resume gaps</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {competencies.map((comp) => (
                <Badge key={comp} variant="default" className="text-xs">
                  {comp}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Two-Column Layout: Questions Kit & Scorecard */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left 2 Cols: Editable Question List & Notes */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Interview Questions & Probes</h2>
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{q.category}</Badge>
                    <span className="text-xs font-mono text-muted-foreground">Question {index + 1} of {questions.length}</span>
                  </div>
                  <CardTitle className="text-base font-semibold pt-1">{q.question}</CardTitle>
                  <CardDescription className="text-xs text-primary/80">Expected: {q.expected}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="space-y-1">
                    <Label className="text-xs">Interviewer Notes & Candidate Response</Label>
                    <textarea
                      rows={2}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Type notes during interview..."
                      value={q.interviewerNote}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[index]!.interviewerNote = e.target.value;
                        setQuestions(updated);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Col: Structured Scorecard */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Structured Scorecard</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Competency Ratings (1-5)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Technical Depth</span>
                    <span className="font-mono">{techRating}/5</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setTechRating(star)}
                        className={`h-8 flex-1 rounded border text-xs font-bold transition-colors ${
                          techRating >= star ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground'
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Communication</span>
                    <span className="font-mono">{commRating}/5</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCommRating(star)}
                        className={`h-8 flex-1 rounded border text-xs font-bold transition-colors ${
                          commRating >= star ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground'
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Culture Fit & Leadership</span>
                    <span className="font-mono">{cultureRating}/5</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCultureRating(star)}
                        className={`h-8 flex-1 rounded border text-xs font-bold transition-colors ${
                          cultureRating >= star ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground'
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-xs">Key Strengths</Label>
                  <Input value={strengths} onChange={(e) => setStrengths(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Areas of Concern / Weaknesses</Label>
                  <Input value={weaknesses} onChange={(e) => setWeaknesses(e.target.value)} className="text-xs h-9" />
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-xs">Final Recommendation</Label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring font-semibold"
                  >
                    <option value="STRONG_YES">Strong Yes</option>
                    <option value="YES">Yes</option>
                    <option value="NEUTRAL">Neutral</option>
                    <option value="NO">No</option>
                    <option value="STRONG_NO">Strong No</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
