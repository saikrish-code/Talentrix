// ============================================================
// Platform-wide enum definitions
// ============================================================

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INVITED = 'INVITED',
  SUSPENDED = 'SUSPENDED',
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  PAUSED = 'PAUSED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SCREENING = 'SCREENING',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum InterviewType {
  PHONE_SCREEN = 'PHONE_SCREEN',
  TECHNICAL = 'TECHNICAL',
  BEHAVIORAL = 'BEHAVIORAL',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN',
  CULTURAL_FIT = 'CULTURAL_FIT',
  FINAL = 'FINAL',
  HR = 'HR',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED',
  NO_SHOW = 'NO_SHOW',
}

export enum InterviewDecision {
  STRONG_YES = 'STRONG_YES',
  YES = 'YES',
  NEUTRAL = 'NEUTRAL',
  NO = 'NO',
  STRONG_NO = 'STRONG_NO',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE',
}

export enum WorkMode {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export enum SeniorityLevel {
  INTERN = 'INTERN',
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
  PRINCIPAL = 'PRINCIPAL',
  STAFF = 'STAFF',
  DIRECTOR = 'DIRECTOR',
  VP = 'VP',
  C_LEVEL = 'C_LEVEL',
}

export enum DocumentType {
  RESUME = 'RESUME',
  COVER_LETTER = 'COVER_LETTER',
  PORTFOLIO = 'PORTFOLIO',
  OFFER_LETTER = 'OFFER_LETTER',
  OTHER = 'OTHER',
}

export enum AiProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  AZURE_OPENAI = 'azure_openai',
  OLLAMA = 'ollama',
}
