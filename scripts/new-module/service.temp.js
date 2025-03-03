export default function genService(name) {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  return `import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ${Name}Service {
  constructor(private readonly prisma: PrismaService) {}

  async ${name}(input: any) {
    console.log('hello' + input);
  }
}
`;
}
