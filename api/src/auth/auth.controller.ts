import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './google-strategy/google-auth.guard'
import { LocalAuthGuard } from './local-strategy/local-auth.guard'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login/local')
  loginUser(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleAuth() {
    // Guard redirects
  }

  @UseGuards(GoogleAuthGuard)
  @Get('oauth2/redirect/google')
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const jwt = await this.authService.googleLogin(req.user)

    const hostURL = this.configService.get<string>('HOST_URL')

    if (jwt) res.redirect(`${hostURL}/login/success/` + jwt.access_token)
    else res.redirect(`${hostURL}/login/failed`)

    return jwt
  }
}
