import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './google-strategy/google-auth.guard'
import { LocalAuthGuard } from './local-strategy/local-auth.guard'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

    if (jwt)
      res.redirect('http://localhost:3000/login/success/' + jwt.access_token)
    else res.redirect('http://localhost:3000/login/failed')

    return jwt
  }
}
