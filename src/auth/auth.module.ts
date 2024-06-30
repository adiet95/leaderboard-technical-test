import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
