import { Injectable } from '@nestjs/common';
import { PostLeaderboardDto } from './dto/create-leaderboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User) private userRepo : Repository<User>
  ){}
  findAll() {
    return this.userRepo.find({take:10, order:{score:'DESC'}});

  }

  postLeaderboard(id: number, updateLeaderboardDto: PostLeaderboardDto) {
    updateLeaderboardDto.id = +id
    return this.userRepo.save(updateLeaderboardDto);
  }
}
