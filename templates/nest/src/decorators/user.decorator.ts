import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const user =
    context.getType() === 'http'
      ? context.switchToHttp().getRequest()?.user
      : context.switchToWs().getClient()?.handshake?.auth;

  if (!user?.id) throw new UnauthorizedException();

  return user.id;
});
