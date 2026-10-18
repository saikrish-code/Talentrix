import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { AiServicesModule } from '../ai-services/ai-services.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [AiServicesModule, StorageModule],
  providers: [CandidatesService],
  controllers: [CandidatesController],
  exports: [CandidatesService],
})
export class CandidatesModule {}
