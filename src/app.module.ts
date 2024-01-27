import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './service/user/user.module';
import { databaseProviders } from './mongoose/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GuardModule,
  ],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule { }
