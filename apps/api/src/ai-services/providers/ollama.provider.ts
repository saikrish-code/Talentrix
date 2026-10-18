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
 * Ollama local LLM provider.
 * Uses Ollama's OpenAI-compatible API endpoint.
 * Great for local development / air-gapped deployments.
 */
@Injectable()
export class OllamaProvider implements ILlmProvider {
  readonly name = 'ollama';
  private readonly logger = new Logger(OllamaProvider.name);
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('ai.ollama.baseUrl', 'http://localhost:11434');
    this.model = this.configService.get<string>('ai.ollama.model', 'llama3');
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    this.logger.debug(`Ollama completion — model=${this.model}`);

    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages: request.messages,
        stream: false,
        options: {
          temperature: request.temperature ?? 0.7,
          num_predict: request.maxTokens,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Ollama request failed: ${res.status} ${await res.text()}`);
    }

    const data = (await res.json()) as {
      message: { content: string };
      eval_count?: number;
      prompt_eval_count?: number;
    };

    const completionTokens = data.eval_count ?? 0;
    const promptTokens = data.prompt_eval_count ?? 0;

    return {
      content: data.message.content,
      model: this.model,
      provider: AiProvider.OLLAMA,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens: promptTokens + completionTokens,
      },
    };
  }

  async embed(request: AiEmbeddingRequest): Promise<AiEmbeddingResponse> {
    const inputs = Array.isArray(request.input) ? request.input : [request.input];
    const embeddings: number[][] = [];

    for (const text of inputs) {
      const res = await fetch(`${this.baseUrl}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: this.model, prompt: text }),
      });

      if (!res.ok) throw new Error(`Ollama embedding failed: ${res.status}`);
      const data = (await res.json()) as { embedding: number[] };
      embeddings.push(data.embedding);
    }

    return {
      embeddings,
      model: this.model,
      provider: AiProvider.OLLAMA,
      usage: { promptTokens: 0, totalTokens: 0 },
    };
  }
}
