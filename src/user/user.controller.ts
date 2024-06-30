import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req) {
    if(req.user.role !== 'admin'){
      throw new ForbiddenException()
    }
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    if(req.user.role !== 'admin'){
      throw new ForbiddenException()
    }
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if(req.user.role !== 'admin'){
      throw new ForbiddenException()
    }
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req, @Param() id: UserIdDto) {
    if(req.user.role !== 'admin'){
      throw new ForbiddenException()
    }
    return this.userService.remove(id.id);
  }
}
