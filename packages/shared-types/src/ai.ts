import type { AiProvider } from './enums';
import type { ParsedResume } from './candidate';
import type { MatchScoreBreakdown } from './application';

// ============================================================
// AI service shared types (model-agnostic contract)
// ============================================================

/** Config required to call any supported LLM provider */
export interface AiProviderConfig {
  provider: AiProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;  // for Ollama or Azure custom endpoints
  deployment?: string; // Azure OpenAI deployment name
  apiVersion?: string; // Azure OpenAI API version
  orgId?: string;      // OpenAI org ID
}

/** Generic chat message */
export interface AiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** Generic completion request */
export interface AiCompletionRequest {
  messages: AiMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json';
}

/** Generic completion response */
export interface AiCompletionResponse {
  content: string;
  model: string;
  provider: AiProvider;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/** Embedding request */
export interface AiEmbeddingRequest {
  input: string | string[];
  model?: string;
}

/** Embedding response */
export interface AiEmbeddingResponse {
  embeddings: number[][];
  model: string;
  provider: AiProvider;
  usage: {
    promptTokens: number;
    totalTokens: number;
  };
}

// ─── Domain-specific AI request/response shapes ──────────────────────────────

export interface ResumeParseRequest {
  resumeText: string;        // plain text extracted from PDF/DOCX
  candidateEmail?: string;
}

export interface ResumeParseResponse {
  parsed: ParsedResume;
  confidence: number; // 0-1
  rawAiOutput: string;
}

export interface JdGenerateRequest {
  title: string;
  department: string;
  seniority: string;
  skills: string[];
  companyContext?: string;
  tone?: 'formal' | 'conversational' | 'startup';
}

export interface JdGenerateResponse {
  description: string;
  requirements: string[];
  niceToHave: string[];
}

export interface MatchScoreRequest {
  resumeText: string;
  jobDescriptionText: string;
  jobRequirements?: string[];
}

export interface MatchScoreResponse {
  breakdown: MatchScoreBreakdown;
}

export interface InterviewQuestionsRequest {
  jobTitle: string;
  jobDescriptionText: string;
  resumeText: string;
  interviewType: string;
  numberOfQuestions?: number;
}

export interface InterviewQuestionsResponse {
  questions: InterviewQuestion[];
}

export interface InterviewQuestion {
  question: string;
  category: string;       // e.g. "Technical", "Behavioral", "Culture Fit"
  difficulty: 'easy' | 'medium' | 'hard';
  rationale: string;       // why this question was chosen
  expectedAnswerGuide: string;
}
