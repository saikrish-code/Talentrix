import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');

    // Enable pgvector extension (idempotent)
    await this.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`;
    this.logger.log('pgvector extension ready');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /** Soft-delete helper: add deletedAt field to a where clause */
  excludeDeleted<T extends Record<string, unknown>>(where?: T): T & { deletedAt: null } {
    return { ...((where ?? {}) as T), deletedAt: null };
  }
}
