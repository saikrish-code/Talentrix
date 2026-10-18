import type {
  AiCompletionRequest,
  AiCompletionResponse,
  AiEmbeddingRequest,
  AiEmbeddingResponse,
} from '@talentrix/shared-types';

/**
 * Contract all LLM provider adapters must implement.
 * The factory resolves the correct adapter at runtime based on config.
 */
export interface ILlmProvider {
  readonly name: string;

  complete(request: AiCompletionRequest): Promise<AiCompletionResponse>;
  embed(request: AiEmbeddingRequest): Promise<AiEmbeddingResponse>;
}
