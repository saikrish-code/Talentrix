'use client';

import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardHeader, CardContent, Button, Avatar, AvatarFallback } from '@talentrix/ui';
import { UserRole, ApplicationStatus } from '@talentrix/shared-types';
import { Clock, AlertTriangle, UserX } from 'lucide-react';
import { cn } from '@talentrix/ui';

export default function PipelinePage() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const columns = [
    { id: ApplicationStatus.APPLIED, title: 'Applied' },
    { id: ApplicationStatus.SCREENING, title: 'AI Screened' },
    { id: ApplicationStatus.SHORTLISTED, title: 'Shortlisted' },
    { id: ApplicationStatus.INTERVIEW, title: 'Interview' },
    { id: ApplicationStatus.OFFER, title: 'Offer' },
    { id: ApplicationStatus.HIRED, title: 'Hired' },
    { id: ApplicationStatus.REJECTED, title: 'Rejected' },
  ];

  const [cards, setCards] = React.useState([
    { id: 'app_1', name: 'Sarah Jenkins', role: 'Senior Full Stack', status: ApplicationStatus.INTERVIEW, score: '94%', daysInStage: 2, stuck: false },
    { id: 'app_2', name: 'Alex Rivera', role: 'Product Manager', status: ApplicationStatus.SHORTLISTED, score: '88%', daysInStage: 6, stuck: true },
    { id: 'app_3', name: 'David Chen', role: 'Staff Infrastructure', status: ApplicationStatus.OFFER, score: '97%', daysInStage: 1, stuck: false },
    { id: 'app_4', name: 'Elena Rostova', role: 'Frontend Engineer', status: ApplicationStatus.APPLIED, score: '82%', daysInStage: 4, stuck: false },
    { id: 'app_5', name: 'Marcus Vance', role: 'Senior Full Stack', status: ApplicationStatus.SCREENING, score: '89%', daysInStage: 7, stuck: true },
  ]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const moveCard = (id: string, newStatus: ApplicationStatus) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus, daysInStage: 0, stuck: false } : c)));
  };

  const bulkMove = (newStatus: ApplicationStatus) => {
    setCards((prev) => prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status: newStatus } : c)));
    setSelectedIds([]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIds([]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppShell userRole={UserRole.ADMIN} userName="Sai Krishna S">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Recruitments</h1>
            <p className="text-sm text-muted-foreground">Drag-and-drop workflow across hiring stages. Candidates stuck &gt;5 days are flagged.</p>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-lg border">
              <span className="text-xs font-semibold px-2">{selectedIds.length} selected</span>
              <Button size="sm" variant="outline" onClick={() => bulkMove(ApplicationStatus.SHORTLISTED)}>
                Move to Shortlist
              </Button>
              <Button size="sm" variant="outline" onClick={() => bulkMove(ApplicationStatus.REJECTED)}>
                <UserX className="mr-1 h-3.5 w-3.5 text-destructive" /> Bulk Reject
              </Button>
            </div>
          )}
        </div>

        {/* Properly oriented horizontal scrolling Kanban board */}
        <div className="flex gap-4 overflow-x-auto pb-6">
          {columns.map((col) => {
            const columnCards = cards.filter((c) => c.status === col.id);
            return (
              <div key={col.id} className="flex flex-col rounded-lg bg-muted/20 border p-3.5 w-72 shrink-0">
                <div className="flex items-center justify-between pb-3 border-b mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider">{col.title}</h3>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-background border text-[10px] font-mono font-semibold">
                    {columnCards.length}
                  </span>
                </div>

                <div className="flex-1 space-y-3 min-h-[300px]">
                  {columnCards.map((card) => {
                    const isSelected = selectedIds.includes(card.id);
                    return (
                      <Card
                        key={card.id}
                        className={cn(
                          'transition-all hover:shadow-md cursor-pointer relative bg-card',
                          card.stuck && 'border-amber-500/80 bg-amber-500/5',
                          isSelected && 'ring-2 ring-primary'
                        )}
                        onClick={() => toggleSelect(card.id)}
                      >
                        <CardHeader className="p-3 pb-2 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-[10px]">{card.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-semibold truncate max-w-[130px]">{card.name}</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-emerald-600">{card.score}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{card.role}</p>
                        </CardHeader>

                        <CardContent className="p-3 pt-0 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{card.daysInStage}d in stage</span>
                            {card.stuck && (
                              <span title="Stuck > 5 days">
                                <AlertTriangle className="h-3 w-3 text-amber-600 ml-1" />
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveCard(card.id, ApplicationStatus.REJECTED);
                              }}
                              title="Quick Reject"
                            >
                              <UserX className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {columnCards.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded border border-dashed text-xs text-muted-foreground">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
