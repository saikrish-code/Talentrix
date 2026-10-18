import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from '@talentrix/shared-types';
import type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiEmbeddingRequest,
  AiEmbeddingResponse,
} from '@talentrix/shared-types';
import type { ILlmProvider } from './llm-provider.interface';

/**
 * Anthropic Claude provider stub.
 * Install `@anthropic-ai/sdk` and replace the placeholder
 * implementation when enabling this provider.
 */
@Injectable()
export class AnthropicProvider implements ILlmProvider {
  readonly name = 'anthropic';
  private readonly logger = new Logger(AnthropicProvider.name);
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.model = this.configService.get<string>(
      'ai.anthropic.model',
      'claude-3-5-sonnet-20241022'
    );
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    this.logger.warn('AnthropicProvider: install @anthropic-ai/sdk to enable this provider');
    // TODO: implement with @anthropic-ai/sdk
    throw new Error('Anthropic provider not yet implemented. Install @anthropic-ai/sdk.');
  }

  async embed(_request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    throw new Error('Anthropic does not offer a public embedding API. Use a different provider for embeddings.');
  }
}
