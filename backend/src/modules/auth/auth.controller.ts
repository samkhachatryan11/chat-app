import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { Response } from 'express';
import { AuthHelper } from '@auth/helpers/auth.helper';
import { Public } from '@common/decorators/public.decorator';
import { LoginDto, RegisterDto } from '@auth/dto';
import { ResponseMessage } from '@root/common/decorators/response-message.decorator';

export const AUTH_CONTROLLER = 'api/auth' as const;

export const AUTH_ROUTES = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout/:userId',
} as const;

@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authHelper: AuthHelper,
  ) {}

  @Public()
  @ResponseMessage('Signed up successfully')
  @Post(AUTH_ROUTES.REGISTER)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.register(registerDto);
    this.authHelper.setAuthCookies(response, tokens);
  }

  @Public()
  @ResponseMessage('Logged in successfully')
  @Post(AUTH_ROUTES.LOGIN)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, tokens } = await this.authService.login(loginDto);
    await this.authHelper.setAuthCookies(response, tokens);

    return user;
  }

  @Post(AUTH_ROUTES.LOGOUT)
  @ResponseMessage('Logged out successfully')
  async logout(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(userId);
    this.authHelper.clearAuthCookies(response);
  }
}
