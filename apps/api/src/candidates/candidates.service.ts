import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Candidates feature service — implementation added per feature sprint */
@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}
}
