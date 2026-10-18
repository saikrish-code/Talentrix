import type { InterviewType, InterviewStatus, InterviewDecision } from './enums';

// ============================================================
// Interview domain types
// ============================================================

export interface InterviewSlot {
  startAt: string; // ISO 8601
  endAt: string;
  timezone: string; // IANA timezone — e.g. Asia/Kolkata
  meetingUrl: string | null;
  location: string | null;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  interviewerId: string;
  decision: InterviewDecision;
  overallRating: number; // 1-5
  technicalRating: number | null;
  communicationRating: number | null;
  cultureFitRating: number | null;
  strengths: string;
  weaknesses: string;
  notes: string;
  submittedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  type: InterviewType;
  status: InterviewStatus;
  round: number; // 1-based
  slot: InterviewSlot;
  interviewerIds: string[];
  feedback: InterviewFeedback[];
  aiGeneratedQuestions: string[] | null;
  calendarEventId: string | null;
  tenantId: string;
  scheduledById: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleInterviewDto {
  applicationId: string;
  type: InterviewType;
  round: number;
  slot: InterviewSlot;
  interviewerIds: string[];
}

export interface SubmitFeedbackDto {
  decision: InterviewDecision;
  overallRating: number;
  technicalRating?: number;
  communicationRating?: number;
  cultureFitRating?: number;
  strengths: string;
  weaknesses: string;
  notes: string;
}
