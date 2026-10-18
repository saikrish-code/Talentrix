import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('candidates')
@Controller({ path: 'candidates', version: '1' })
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Public()
  @Post('apply')
  @ApiOperation({ summary: 'Public candidate application with resume parsing' })
  apply(@Body() dto: any) {
    return this.candidatesService.apply(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'List candidate profiles' })
  findAll(@Query('tenantId') tenantId?: string) {
    return this.candidatesService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get candidate profile by ID with parsed resume & documents' })
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(id);
  }
}
