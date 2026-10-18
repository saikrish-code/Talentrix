import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Healths feature service — implementation added per feature sprint */
@Injectable()
export class HealthsService {
  constructor(private readonly prisma: PrismaService) {}
}
