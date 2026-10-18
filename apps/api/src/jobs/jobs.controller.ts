import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { JobStatus } from '@talentrix/shared-types';
import type { CreateJobDto, UpdateJobDto, JobFilters } from '@talentrix/shared-types';

@ApiTags('jobs')
@Controller({ path: 'jobs', version: '1' })
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get public job listings' })
  findPublic() {
    return this.jobsService.findPublic();
  }

  @Public()
  @Get('public/:id')
  @ApiOperation({ summary: 'Get single public job listing' })
  findPublicOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'List all jobs (internal)' })
  @ApiQuery({ name: 'status', required: false, enum: JobStatus })
  @ApiQuery({ name: 'department', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('status') status?: JobStatus,
    @Query('department') department?: string,
    @Query('search') search?: string,
    @Query('tenantId') tenantId?: string
  ) {
    const filters: JobFilters = {
      ...(status ? { status } : {}),
      ...(department ? { department } : {}),
      ...(search ? { search } : {}),
    };
    return this.jobsService.findAll(filters, tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new job requisition' })
  create(@Body() dto: CreateJobDto, @Query('tenantId') tenantId: string) {
    return this.jobsService.create(dto, tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update job requisition' })
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id/status')
  @ApiOperation({ summary: 'Update job status' })
  updateStatus(@Param('id') id: string, @Body('status') status: JobStatus) {
    return this.jobsService.updateStatus(id, status);
  }
}
