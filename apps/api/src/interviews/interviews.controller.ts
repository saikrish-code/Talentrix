import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InterviewsService } from './interviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('interviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'interviews', version: '1' })
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get()
  @ApiOperation({ summary: 'List interviews' })
  findAll() {
    return [];
  }
}
