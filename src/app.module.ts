import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CommonModule } from './modules/common/common.module';
import { OSSModule } from './modules/oss/oss.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    CommonModule,
    OSSModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
