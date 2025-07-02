import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayloadJwt } from '../types/jwt-payload.type';

export const JwtDecodedPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserPayloadJwt;
  },
);
