import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'analytics', version: '1' })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get recruitment analytics summary' })
  getSummary(@Query('tenantId') tenantId?: string) {
    return this.analyticsService.getSummary(tenantId);
  }

  @Get('insights')
  @ApiOperation({ summary: 'Get AI natural-language insights on hiring trends & bottlenecks' })
  getInsights(@Query('tenantId') tenantId?: string) {
    return this.analyticsService.getAiInsights(tenantId);
  }
}
