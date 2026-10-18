import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Jobs feature service — implementation added per feature sprint */
@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}
}
