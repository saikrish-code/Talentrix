import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env['API_PORT'] ?? '4000', 10),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  corsOrigin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
}));

export const databaseConfig = registerAs('database', () => ({
  url: process.env['DATABASE_URL'],
}));

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env['JWT_SECRET'],
  jwtExpiresIn: process.env['JWT_EXPIRES_IN'] ?? '1d',
  jwtRefreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d',
}));

export const storageConfig = registerAs('storage', () => ({
  endpoint: process.env['S3_ENDPOINT'],
  region: process.env['S3_REGION'] ?? 'us-east-1',
  bucket: process.env['S3_BUCKET'],
  accessKeyId: process.env['S3_ACCESS_KEY_ID'],
  secretAccessKey: process.env['S3_SECRET_ACCESS_KEY'],
  publicUrl: process.env['S3_PUBLIC_URL'],
}));

export const aiConfig = registerAs('ai', () => ({
  provider: process.env['TALENTRIX_AI_PROVIDER'] ?? 'openai',
  openai: {
    apiKey: process.env['OPENAI_API_KEY'],
    orgId: process.env['OPENAI_ORG_ID'],
    model: process.env['OPENAI_MODEL'] ?? 'gpt-4o',
    embeddingModel: process.env['OPENAI_EMBEDDING_MODEL'] ?? 'text-embedding-3-large',
  },
  anthropic: {
    apiKey: process.env['ANTHROPIC_API_KEY'],
    model: process.env['ANTHROPIC_MODEL'] ?? 'claude-3-5-sonnet-20241022',
  },
  google: {
    apiKey: process.env['GOOGLE_AI_API_KEY'],
    model: process.env['GOOGLE_AI_MODEL'] ?? 'gemini-1.5-pro',
  },
  azureOpenai: {
    apiKey: process.env['AZURE_OPENAI_API_KEY'],
    endpoint: process.env['AZURE_OPENAI_ENDPOINT'],
    deployment: process.env['AZURE_OPENAI_DEPLOYMENT'],
    apiVersion: process.env['AZURE_OPENAI_API_VERSION'] ?? '2024-08-01-preview',
  },
  ollama: {
    baseUrl: process.env['OLLAMA_BASE_URL'] ?? 'http://localhost:11434',
    model: process.env['OLLAMA_MODEL'] ?? 'llama3',
  },
}));
