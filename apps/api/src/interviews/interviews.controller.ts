import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InterviewDecision } from '@prisma/client';

@ApiTags('interviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'interviews', version: '1' })
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get()
  @ApiOperation({ summary: 'List all interviews' })
  findAll(@Query('tenantId') tenantId?: string) {
    return this.interviewsService.findAll(tenantId);
  }

  @Get('application/:applicationId/panel-summary')
  @ApiOperation({ summary: 'Get synthesized panel summary and divergence flag across interviewers' })
  getPanelSummary(@Param('applicationId') applicationId: string) {
    return this.interviewsService.getPanelSummary(applicationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get interview details & kit' })
  findOne(@Param('id') id: string) {
    return this.interviewsService.findOne(id);
  }

  @Post(':id/generate-questions')
  @ApiOperation({ summary: 'Generate AI interview questions kit' })
  generateQuestions(@Param('id') id: string, @Body('competencies') competencies?: string[]) {
    return this.interviewsService.generateQuestions(id, competencies);
  }

  @Post(':id/feedback')
  @ApiOperation({ summary: 'Submit scorecard & feedback for interview' })
  submitFeedback(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    const interviewerId = req.user?.id ?? 'default-user';
    return this.interviewsService.submitFeedback(id, interviewerId, dto);
  }
}
