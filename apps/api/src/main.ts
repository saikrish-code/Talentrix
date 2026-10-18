import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');
  const port = configService.get<number>('API_PORT', 4000);

  // ── Security ─────────────────────────────────────────────
  app.use(helmet());
  app.enableCors({ origin: corsOrigin, credentials: true });

  // ── Versioning ───────────────────────────────────────────
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // ── Global prefix ────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Validation pipe ──────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // ── Swagger / OpenAPI ────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Talentrix API')
    .setDescription('Enterprise AI Recruitment Platform — REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & authorization')
    .addTag('users', 'User management')
    .addTag('jobs', 'Job postings')
    .addTag('candidates', 'Candidate profiles & resume management')
    .addTag('applications', 'Application pipeline')
    .addTag('interviews', 'Interview scheduling & feedback')
    .addTag('ai', 'AI-powered features')
    .addTag('storage', 'Document upload & retrieval')
    .addTag('health', 'Health checks')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port);
  console.log(`🚀 Talentrix API running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at   http://localhost:${port}/api/docs`);
}

bootstrap().catch(console.error);
