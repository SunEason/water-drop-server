import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TempService {
  constructor(private readonly prisma: PrismaService) {}

  async greet(input: any) {
    console.log('hello' + input);
  }
}
