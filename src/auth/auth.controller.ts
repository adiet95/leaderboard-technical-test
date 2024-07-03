import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { JwtGuard } from './jwt/jwt.guard';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtGuard)
  checkUser(@Request() req){
    return req.user
  }

  @Post()
  async login(@Body() authDto: AuthDto){
    let user = await this.authService.checkUser(authDto.username, authDto.password)
    return this.authService.generateToken({id: user.id})
  }
}
