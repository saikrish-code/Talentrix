import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ApplicationsModule } from './applications/applications.module';
import { InterviewsModule } from './interviews/interviews.module';
import { AiServicesModule } from './ai-services/ai-services.module';
import { StorageModule } from './storage/storage.module';
import { HealthModule } from './health/health.module';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { authConfig } from './config/auth.config';
import { storageConfig } from './config/storage.config';
import { aiConfig } from './config/ai.config';

@Module({
  imports: [
    // ─── Config ─────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [appConfig, databaseConfig, authConfig, storageConfig, aiConfig],
    }),

    // ─── Rate limiting ───────────────────────────────────────
    ThrottlerModule.forRoot([
      { name: 'short',  ttl: 1000,  limit: 10  },   // 10 req/s
      { name: 'medium', ttl: 10000, limit: 100 },   // 100 req/10s
      { name: 'long',   ttl: 60000, limit: 500 },   // 500 req/min
    ]),

    // ─── Core infrastructure ─────────────────────────────────
    PrismaModule,

    // ─── Feature modules ─────────────────────────────────────
    AuthModule,
    UsersModule,
    JobsModule,
    CandidatesModule,
    ApplicationsModule,
    InterviewsModule,
    AiServicesModule,
    StorageModule,
    HealthModule,
  ],
})
export class AppModule {}
