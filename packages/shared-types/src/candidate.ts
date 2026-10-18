import type { DocumentType } from './enums';

// ============================================================
// Candidate domain types
// ============================================================

export interface CandidateDocument {
  id: string;
  type: DocumentType;
  name: string;
  s3Key: string;
  s3Url: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface CandidateProfile {
  id: string;
  userId: string | null; // set if the candidate has a platform account
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  githubUrl: string | null;
  summary: string | null;
  skills: string[];
  totalExperienceYears: number | null;
  currentTitle: string | null;
  currentCompany: string | null;
  documents: CandidateDocument[];
  parsedResume: ParsedResume | null;
  embeddingId: string | null; // pgvector reference
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

/** Structured resume data extracted by the AI parsing service */
export interface ParsedResume {
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  languages: string[];
}

export interface WorkExperience {
  company: string;
  title: string;
  startDate: string; // YYYY-MM
  endDate: string | null; // null = current
  description: string;
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  gpa: number | null;
}

export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string | null;
  expiryDate: string | null;
  url: string | null;
}

export interface CreateCandidateDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  skills?: string[];
}
