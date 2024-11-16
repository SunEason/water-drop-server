import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AuthService, AuthResolver],
  exports: [AuthResolver],
})
export class AuthModule {}
