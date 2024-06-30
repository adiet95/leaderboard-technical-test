import { IsEmail, IsNumber, IsOptional, IsString, isString, MaxLength, MinLength } from "class-validator"
import { IsUnique } from "src/etc/validator/validator"
import { User } from "../entities/user.entity"
import { IsExist } from "src/etc/validator/unique-validator"
import { OmitType, PickType } from "@nestjs/mapped-types"

export class UserDto {
    @IsOptional()
    @IsExist([User, 'id'])
    id : number

    @IsString()
    @MaxLength(200)
    name : string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @IsUnique([User,'username'])
    username : string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password : string

    @IsNumber()
    score : number

    role : string
}

export class CreateUserDto extends OmitType(UserDto, ['id']){}
export class UserIdDto extends PickType(UserDto, ['id']){}
