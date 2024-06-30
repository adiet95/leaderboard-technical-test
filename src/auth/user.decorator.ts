import { createParamDecorator, ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt/jwt.guard';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );