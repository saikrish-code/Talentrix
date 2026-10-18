import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/** Health check module — exposes /api/v1/health for liveness/readiness probes */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
