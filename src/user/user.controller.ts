import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, Inject} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RealIP } from 'nestjs-real-ip';

@SkipThrottle()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @RealIP() ip: string) {
    this.logger.log('Post create()', UserController.name, ip);
    try {
      this.logger.log('Post create()', UserController.name, ip)
    } catch (e) {
      this.logger.error('Post create()', e.stack, UserController.name, ip);
    }

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
