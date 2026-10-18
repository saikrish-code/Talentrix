import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AiProvider } from '@talentrix/shared-types';
import type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiEmbeddingRequest,
  AiEmbeddingResponse,
} from '@talentrix/shared-types';
import type { ILlmProvider } from './llm-provider.interface';

@Injectable()
export class OpenAiProvider implements ILlmProvider {
  readonly name = 'openai';
  private readonly logger = new Logger(OpenAiProvider.name);
  private client: OpenAI;
  private model: string;
  private embeddingModel: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('ai.openai.apiKey'),
      organization: this.configService.get<string>('ai.openai.orgId'),
    });
    this.model = this.configService.get<string>('ai.openai.model', 'gpt-4o');
    this.embeddingModel = this.configService.get<string>(
      'ai.openai.embeddingModel',
      'text-embedding-3-large'
    );
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    this.logger.debug(`OpenAI completion — model=${this.model}`);

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      ...(request.maxTokens !== undefined ? { max_tokens: request.maxTokens } : {}),
      response_format:
        request.responseFormat === 'json' ? { type: 'json_object' } : { type: 'text' },
    });

    const choice = response.choices[0];
    return {
      content: choice?.message?.content ?? '',
      model: response.model,
      provider: AiProvider.OPENAI,
      usage: {
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
      },
    };
  }

  async embed(request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    this.logger.debug(`OpenAI embedding — model=${this.embeddingModel}`);

    const inputs = Array.isArray(request.input) ? request.input : [request.input];
    const response = await this.client.embeddings.create({
      model: request.model ?? this.embeddingModel,
      input: inputs,
    });

    return {
      embeddings: response.data.map((d) => d.embedding),
      model: response.model,
      provider: AiProvider.OPENAI,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        totalTokens: response.usage.total_tokens,
      },
    };
  }
}
