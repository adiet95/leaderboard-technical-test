import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import path from 'path';
import { join } from 'path';
import { Path } from 'glob';
import { LoggerMiddleware } from 'src/middlewares/logger/logger.middleware';


@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 30,
      limit: 10
    }]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      entities: [
        User
      ],
      synchronize: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          // dirname: path.join(__dirname, '.', '..', 'log', 'debug'), //path to where save loggin result 
          filename: 'debug.log', //name of file where will be saved logging result
          level: 'debug',
        }),
        new winston.transports.File({
          // dirname: path.join(__dirname, '.', '..', 'log', 'info'),
          filename: 'info.log',
          level: 'info',
        }),
      ],
    }),
    UserModule,
    AuthModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
