import type { JobStatus, EmploymentType, WorkMode, SeniorityLevel } from './enums';

// ============================================================
// Job / Job Description types
// ============================================================

export interface JobLocation {
  city?: string;
  state?: string;
  country: string;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string; // ISO 4217 — e.g. USD, INR
  period: 'ANNUAL' | 'MONTHLY' | 'HOURLY';
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: JobLocation;
  workMode: WorkMode;
  employmentType: EmploymentType;
  seniority: SeniorityLevel;
  status: JobStatus;
  description: string;        // rich text / markdown
  requirements: string[];
  niceToHave: string[];
  skills: string[];
  salaryRange: SalaryRange | null;
  openings: number;
  hiringManagerId: string;
  recruiterId: string | null;
  tenantId: string;
  embeddingId: string | null; // pgvector embedding reference
  publishedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobDto {
  title: string;
  department: string;
  location: JobLocation;
  workMode: WorkMode;
  employmentType: EmploymentType;
  seniority: SeniorityLevel;
  description: string;
  requirements?: string[];
  niceToHave?: string[];
  skills?: string[];
  salaryRange?: SalaryRange;
  openings?: number;
  hiringManagerId: string;
  recruiterId?: string;
}

export interface UpdateJobDto extends Partial<CreateJobDto> {
  status?: JobStatus;
}

export interface JobFilters {
  status?: JobStatus;
  department?: string;
  workMode?: WorkMode;
  employmentType?: EmploymentType;
  seniority?: SeniorityLevel;
  search?: string;
}
