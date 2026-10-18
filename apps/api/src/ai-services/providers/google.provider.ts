import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiEmbeddingRequest,
  AiEmbeddingResponse,
} from '@talentrix/shared-types';
import type { ILlmProvider } from './llm-provider.interface';

/** Google Gemini provider stub — install @google/generative-ai to enable */
@Injectable()
export class GoogleProvider implements ILlmProvider {
  readonly name = 'google';
  private readonly logger = new Logger(GoogleProvider.name);

  constructor(private readonly configService: ConfigService) {}

  async complete(_request: AiCompletionRequest): Promise<AiCompletionResponse> {
    throw new Error('Google provider not yet implemented. Install @google/generative-ai.');
  }

  async embed(_request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    throw new Error('Google provider embedding not yet implemented.');
  }
}
