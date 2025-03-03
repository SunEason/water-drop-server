export default function genModule(name) {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  return `import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ${Name}Resolver } from './${name}.resolver';
import { ${Name}Service } from './${name}.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [${Name}Resolver, ${Name}Service],
  exports: [${Name}Resolver, ${Name}Service],
})
export class ${Name}Module {}
`;
}
