import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';

@Module({
  imports: [
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
    UserModule,
    AuthModule,
    LeaderboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
