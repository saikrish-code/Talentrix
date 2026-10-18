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

/**
 * Azure OpenAI provider — uses the official OpenAI SDK with Azure base URL.
 * Requires: AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT
 */
@Injectable()
export class AzureOpenAiProvider implements ILlmProvider {
  readonly name = 'azure_openai';
  private readonly logger = new Logger(AzureOpenAiProvider.name);
  private client: OpenAI;
  private deployment: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>('ai.azureOpenai.endpoint') ?? '';
    const apiVersion = this.configService.get<string>(
      'ai.azureOpenai.apiVersion',
      '2024-08-01-preview'
    );
    this.deployment = this.configService.get<string>('ai.azureOpenai.deployment') ?? '';

    this.client = new OpenAI({
      apiKey: this.configService.get<string>('ai.azureOpenai.apiKey'),
      baseURL: `${endpoint}/openai/deployments/${this.deployment}`,
      defaultQuery: { 'api-version': apiVersion },
      defaultHeaders: { 'api-key': this.configService.get<string>('ai.azureOpenai.apiKey') ?? '' },
    });
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const response = await this.client.chat.completions.create({
      model: this.deployment,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      ...(request.maxTokens !== undefined ? { max_tokens: request.maxTokens } : {}),
    });

    return {
      content: response.choices[0]?.message?.content ?? '',
      model: this.deployment,
      provider: AiProvider.AZURE_OPENAI,
      usage: {
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
      },
    };
  }

  async embed(request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    const inputs = Array.isArray(request.input) ? request.input : [request.input];
    const response = await this.client.embeddings.create({
      model: this.deployment,
      input: inputs,
    });

    return {
      embeddings: response.data.map((d) => d.embedding),
      model: this.deployment,
      provider: AiProvider.AZURE_OPENAI,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        totalTokens: response.usage.total_tokens,
      },
    };
  }
}
