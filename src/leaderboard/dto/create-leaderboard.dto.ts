import { OmitType, PickType } from "@nestjs/mapped-types"
import { User } from "src/user/entities/user.entity"
import { UserDto } from "src/user/dto/create-user.dto"

export class PostLeaderboardDto extends PickType(UserDto, ['name', 'score', 'id']){}
export class GetLeaderboardDto extends PickType(UserDto, ['name', 'score']){}
