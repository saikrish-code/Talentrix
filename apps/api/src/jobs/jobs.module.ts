import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { AiServicesModule } from '../ai-services/ai-services.module';

@Module({
  imports: [AiServicesModule],
  providers: [JobsService],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule {}
