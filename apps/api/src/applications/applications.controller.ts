import { Controller, Get, Patch, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationStatus } from '@prisma/client';

@ApiTags('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'applications', version: '1' })
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'List applications with optional jobId filter' })
  findAll(@Query('jobId') jobId?: string, @Query('tenantId') tenantId?: string) {
    return this.applicationsService.findAll(jobId, tenantId);
  }

  @Patch(':id/stage')
  @ApiOperation({ summary: 'Move application stage' })
  updateStage(@Param('id') id: string, @Body('status') status: ApplicationStatus, @Body('note') note: string, @Req() req: any) {
    const userId = req.user?.id ?? 'default-user';
    return this.applicationsService.updateStage(id, status, note, userId);
  }

  @Post('bulk-stage')
  @ApiOperation({ summary: 'Bulk update application stage' })
  bulkUpdateStage(@Body('ids') ids: string[], @Body('status') status: ApplicationStatus, @Body('note') note: string) {
    return this.applicationsService.bulkUpdateStage(ids, status, note);
  }
}
