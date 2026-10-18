import { Injectable, Logger } from '@nestjs/common';
import { LlmProviderFactory } from './providers/llm-provider.factory';
import type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiEmbeddingRequest,
  AiEmbeddingResponse,
  ResumeParseRequest,
  ResumeParseResponse,
  JdGenerateRequest,
  JdGenerateResponse,
  MatchScoreRequest,
  MatchScoreResponse,
  InterviewQuestionsRequest,
  InterviewQuestionsResponse,
} from '@talentrix/shared-types';
import { RESUME_PARSE_PROMPT, JD_GENERATE_PROMPT, MATCH_SCORE_PROMPT, INTERVIEW_QUESTIONS_PROMPT } from './prompts';

/**
 * AiServicesService
 *
 * Orchestrates all AI-powered features of the Talentrix platform.
 * All LLM interactions go through this service — never call providers directly
 * from feature modules. This ensures:
 *  - A single place to add logging, cost tracking, and error handling
 *  - Easy provider swapping without touching feature code
 *  - Testability (mock this service in feature tests)
 */
@Injectable()
export class AiServicesService {
  private readonly logger = new Logger(AiServicesService.name);

  constructor(private readonly providerFactory: LlmProviderFactory) {}

  // ── Generic passthrough ────────────────────────────────────────────────────

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const provider = this.providerFactory.getProvider();
    this.logger.log(`AI completion via ${provider.name}`);
    return provider.complete(request);
  }

  async embed(request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    const provider = this.providerFactory.getProvider();
    return provider.embed(request);
  }

  // ── Domain-specific AI operations ─────────────────────────────────────────

  /**
   * Parse a plain-text resume and extract structured data.
   */
  async parseResume(request: ResumeParseRequest): Promise<ResumeParseResponse> {
    this.logger.log('Parsing resume...');
    const response = await this.complete({
      messages: [
        { role: 'system', content: RESUME_PARSE_PROMPT },
        { role: 'user', content: `Resume text:\n\n${request.resumeText}` },
      ],
      temperature: 0.1,
      responseFormat: 'json',
    });

    const parsed = JSON.parse(response.content) as ResumeParseResponse['parsed'];
    return {
      parsed,
      confidence: 0.9, // TODO: extract from AI response
      rawAiOutput: response.content,
    };
  }

  /**
   * Generate a job description from structured input.
   */
  async generateJobDescription(request: JdGenerateRequest): Promise<JdGenerateResponse> {
    this.logger.log(`Generating JD for ${request.title}`);
    const response = await this.complete({
      messages: [
        { role: 'system', content: JD_GENERATE_PROMPT },
        { role: 'user', content: JSON.stringify(request) },
      ],
      temperature: 0.7,
      responseFormat: 'json',
    });

    return JSON.parse(response.content) as JdGenerateResponse;
  }

  /**
   * Score a candidate's resume against a job description.
   */
  async computeMatchScore(request: MatchScoreRequest): Promise<MatchScoreResponse> {
    this.logger.log('Computing match score...');
    const response = await this.complete({
      messages: [
        { role: 'system', content: MATCH_SCORE_PROMPT },
        {
          role: 'user',
          content: JSON.stringify({
            resume: request.resumeText,
            jobDescription: request.jobDescriptionText,
            requirements: request.jobRequirements,
          }),
        },
      ],
      temperature: 0.1,
      responseFormat: 'json',
    });

    return JSON.parse(response.content) as MatchScoreResponse;
  }

  /**
   * Generate tailored interview questions for a candidate+role.
   */
  async generateInterviewQuestions(
    request: InterviewQuestionsRequest
  ): Promise<InterviewQuestionsResponse> {
    this.logger.log(`Generating ${request.numberOfQuestions ?? 10} interview questions`);
    const response = await this.complete({
      messages: [
        { role: 'system', content: INTERVIEW_QUESTIONS_PROMPT },
        { role: 'user', content: JSON.stringify(request) },
      ],
      temperature: 0.6,
      responseFormat: 'json',
    });

    return JSON.parse(response.content) as InterviewQuestionsResponse;
  }
}
