import type { ApplicationStatus } from './enums';
import type { CandidateProfile } from './candidate';
import type { Job } from './job';

// ============================================================
// Application (pipeline stage) domain types
// ============================================================

export interface StageHistoryEntry {
  stage: ApplicationStatus;
  movedById: string;
  movedAt: string;
  note: string | null;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  matchScore: number | null;          // 0-100, computed by AI
  matchScoreBreakdown: MatchScoreBreakdown | null;
  coverLetterText: string | null;
  source: string | null;             // e.g. "LinkedIn", "Referral", "Career Page"
  referredById: string | null;
  stageHistory: StageHistoryEntry[];
  notes: ApplicationNote[];
  tenantId: string;
  createdAt: string;
  updatedAt: string;

  // populated via relations (optional)
  candidate?: CandidateProfile;
  job?: Job;
}

export interface MatchScoreBreakdown {
  skillsMatch: number;      // 0-100
  experienceMatch: number;
  educationMatch: number;
  locationMatch: number;
  overallScore: number;
  aiRationale: string;
}

export interface ApplicationNote {
  id: string;
  authorId: string;
  content: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface CreateApplicationDto {
  jobId: string;
  candidateId: string;
  coverLetterText?: string;
  source?: string;
  referredById?: string;
}

export interface MoveStageDto {
  status: ApplicationStatus;
  note?: string;
}
