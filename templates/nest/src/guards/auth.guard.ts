import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isHttp = context.getType() === 'http';

    const request = isHttp
      ? context.switchToHttp().getRequest()
      : context.switchToWs().getClient()?.handshake;

    const user = await this.authService.verifyRequest(request);

    if (isHttp) request.user = user;
    else request.auth = user;

    return true;
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);
