import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo : Repository<User>
  ){}
  create(createUserDto: CreateUserDto) {
    if(createUserDto.role == '' || createUserDto.role == undefined || createUserDto.role == 'admin'){
      createUserDto.role = 'user'
    }

    createUserDto.password = this.hash(createUserDto.password)
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({id: id});
  }

  findUsername(username: string) {
    return this.userRepo.findOneBy({username: username});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
    if(updateUserDto.password){
      updateUserDto.password = this.hash(updateUserDto.password)
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    let user = await this.userRepo.findOneBy({id: id})
    return this.userRepo.remove(user);
  }

  hash(plainPassword){
    const hash = bcrypt.hashSync(plainPassword, 10)
    return hash
  }

  compare(plainPassword, hash){
    const valid = bcrypt.compareSync(plainPassword, hash)
    return valid
  }
}
