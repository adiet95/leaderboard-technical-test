import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username : string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password : string
}