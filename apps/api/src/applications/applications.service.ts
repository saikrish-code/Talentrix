import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Applications feature service — implementation added per feature sprint */
@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}
}
