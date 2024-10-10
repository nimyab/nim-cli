import { ConfigService } from '@/config/config.service';
import { Id } from '@/schemas/controller.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '../schemas/user/role.schema';
import { Payload, PayloadSchema } from '../schemas/user/payload.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(userId: Id, role: Role) {
    const newAccessToken = await this.jwtService.signAsync(
      { id: userId, role, tokenType: 'access' } as Payload,
      {
        expiresIn: this.configService.get('JWT_ACCESS_TIME')
      }
    );
    const newRefreshToken = await this.jwtService.signAsync(
      { id: userId, role, tokenType: 'refresh' } as Payload,
      {
        expiresIn: this.configService.get('JWT_REFRESH_TIME')
      }
    );
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  async refreshTokens(request: Request) {
    const { id, role, tokenType } = await this.verifyRequest(request);
    if (tokenType !== 'refresh') throw new UnauthorizedException('token is not refresh');
    const newAccessToken = await this.jwtService.signAsync(
      { id, role, tokenType: 'access' } as Payload,
      {
        expiresIn: this.configService.get('JWT_ACCESS_TIME')
      }
    );
    const newRefreshToken = await this.jwtService.signAsync(
      { id, role, tokenType: 'refresh' } as Payload,
      {
        expiresIn: this.configService.get('JWT_REFRESH_TIME')
      }
    );
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  async verify(token: string) {
    try {
      const data = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET')
      });
      const userPayload = PayloadSchema.safeParse(data);

      if (!userPayload.success) throw new UnauthorizedException();
      return userPayload.data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async verifyRequest(request: Request) {
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    return this.verify(token);
  }
}
