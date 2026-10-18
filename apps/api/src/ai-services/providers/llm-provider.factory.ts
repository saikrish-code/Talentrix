import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from '@talentrix/shared-types';
import type { ILlmProvider } from './llm-provider.interface';
import { OpenAiProvider } from './openai.provider';
import { AnthropicProvider } from './anthropic.provider';
import { GoogleProvider } from './google.provider';
import { AzureOpenAiProvider } from './azure-openai.provider';
import { OllamaProvider } from './ollama.provider';

/**
 * Factory that resolves the active LLM provider based on the
 * TALENTRIX_AI_PROVIDER environment variable.
 *
 * To add a new provider:
 *  1. Implement ILlmProvider in a new file under this directory
 *  2. Register the class in AiServicesModule providers array
 *  3. Add it to the switch case below
 */
@Injectable()
export class LlmProviderFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly openAiProvider: OpenAiProvider,
    private readonly anthropicProvider: AnthropicProvider,
    private readonly googleProvider: GoogleProvider,
    private readonly azureOpenAiProvider: AzureOpenAiProvider,
    private readonly ollamaProvider: OllamaProvider
  ) {}

  getProvider(override?: AiProvider): ILlmProvider {
    const configured = this.configService.get<string>('ai.provider', 'openai');
    const providerKey = override ?? (configured as AiProvider);

    switch (providerKey) {
      case AiProvider.OPENAI:
        return this.openAiProvider;
      case AiProvider.ANTHROPIC:
        return this.anthropicProvider;
      case AiProvider.GOOGLE:
        return this.googleProvider;
      case AiProvider.AZURE_OPENAI:
        return this.azureOpenAiProvider;
      case AiProvider.OLLAMA:
        return this.ollamaProvider;
      default:
        throw new NotFoundException(`Unknown AI provider: ${providerKey}`);
    }
  }
}
