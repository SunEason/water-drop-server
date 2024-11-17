import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserResolver, UserService],
  exports: [UserResolver, UserService],
})
export class UserModule {}
