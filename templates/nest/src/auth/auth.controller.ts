import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UseAuthGuard } from '../guards/auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновление access и refresh токена' })
  @UseAuthGuard()
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(req);
    res.json({ accessToken, refreshToken });
  }
}
