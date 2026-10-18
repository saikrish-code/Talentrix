import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiServicesService } from './ai-services.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'ai', version: '1' })
export class AiServicesController {
  constructor(private readonly aiServicesService: AiServicesService) {}

  @Post('resume/parse')
  @ApiOperation({ summary: 'Parse a resume and extract structured data' })
  parseResume(@Body() body: { resumeText: string }) {
    return this.aiServicesService.parseResume({ resumeText: body.resumeText });
  }

  @Post('jobs/generate-description')
  @ApiOperation({ summary: 'Generate a job description from structured input' })
  generateJd(@Body() body: Record<string, unknown>) {
    return this.aiServicesService.generateJobDescription(body as never);
  }

  @Post('applications/match-score')
  @ApiOperation({ summary: 'Compute AI match score between a candidate and job' })
  matchScore(@Body() body: { resumeText: string; jobDescriptionText: string }) {
    return this.aiServicesService.computeMatchScore(body);
  }

  @Post('interviews/questions')
  @ApiOperation({ summary: 'Generate tailored interview questions' })
  interviewQuestions(@Body() body: Record<string, unknown>) {
    return this.aiServicesService.generateInterviewQuestions(body as never);
  }
}
