'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Logo, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@talentrix/ui';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CandidateSelfSchedulePage() {
  const params = useParams();
  const token = params?.['token'] as string;

  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const availableSlots = [
    { id: 'slot_1', date: 'Monday, Oct 20, 2026', time: '10:00 AM - 11:00 AM UTC' },
    { id: 'slot_2', date: 'Monday, Oct 20, 2026', time: '02:00 PM - 03:00 PM UTC' },
    { id: 'slot_3', date: 'Tuesday, Oct 21, 2026', time: '11:00 AM - 12:00 PM UTC' },
    { id: 'slot_4', date: 'Wednesday, Oct 22, 2026', time: '04:00 PM - 05:00 PM UTC' },
  ];

  const handleConfirm = () => {
    if (!selectedSlot) return;
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-6 space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Interview Confirmed!</CardTitle>
          <CardDescription>
            Calendar invites and automated reminder emails have been sent to your email address. We look forward to speaking with you.
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-20 items-center justify-between px-6 mx-auto">
          <Logo size="lg" />
          <span className="text-xs font-mono text-muted-foreground">Self-Scheduling Portal</span>
        </div>
      </header>

      <main className="container max-w-xl mx-auto px-6 py-12 flex-1 flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Schedule Your Interview Session</CardTitle>
            <CardDescription>Select a mutual available slot below for your Technical Round.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableSlots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    isSelected ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">{slot.date}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {slot.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={!selectedSlot} onClick={handleConfirm}>
              Confirm Interview Slot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
