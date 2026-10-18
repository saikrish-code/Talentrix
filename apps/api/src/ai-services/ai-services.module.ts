import { Module } from '@nestjs/common';
import { AiServicesService } from './ai-services.service';
import { AiServicesController } from './ai-services.controller';
import { LlmProviderFactory } from './providers/llm-provider.factory';
import { OpenAiProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { GoogleProvider } from './providers/google.provider';
import { AzureOpenAiProvider } from './providers/azure-openai.provider';
import { OllamaProvider } from './providers/ollama.provider';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AiServicesController],
  providers: [
    AiServicesService,
    LlmProviderFactory,
    OpenAiProvider,
    AnthropicProvider,
    GoogleProvider,
    AzureOpenAiProvider,
    OllamaProvider,
  ],
  exports: [AiServicesService],
})
export class AiServicesModule {}
