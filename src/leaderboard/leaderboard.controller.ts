import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { PostLeaderboardDto } from './dto/create-leaderboard.dto';
import { User } from 'src/auth/user.decorator';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtGuard)
  @Post()
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
  @Get()
  findAll() {
    return this.leaderboardService.findAll();
  }
}
