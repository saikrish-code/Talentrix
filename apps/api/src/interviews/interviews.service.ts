import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Interviews feature service — implementation added per feature sprint */
@Injectable()
export class InterviewsService {
  constructor(private readonly prisma: PrismaService) {}
}
