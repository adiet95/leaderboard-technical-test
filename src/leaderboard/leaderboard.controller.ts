import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { GetLeaderboardDto, PostLeaderboardDto } from './dto/create-leaderboard.dto';
import { User } from 'src/user/entities/user.entity';
import { use } from 'passport';

@Controller()
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtGuard)
  @Post('scores')
  postScore(@Req() req, @Body() updateLeaderboardDto: PostLeaderboardDto) {
    let userId: number
    if(req.user.role == 'admin'){
      if(updateLeaderboardDto.id){
        userId = updateLeaderboardDto.id
      } else {
        userId = +req.user.id
      }
    } else {
      userId = +req.user.id
    }
    return this.leaderboardService.postLeaderboard(userId, updateLeaderboardDto);
  }

  @UseGuards(JwtGuard)
  @Get('leaderboard')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(){
    return this.leaderboardService.findAll();
  }
}
