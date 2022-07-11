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
  googleAuth(@Req() req: any) {
    // Guard redirects
  }

  @UseGuards(GoogleAuthGuard)
  @Get('oauth2/redirect/google')
  googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    res.redirect('http://localhost:3000')
    return this.authService.googleLogin(req.user)
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return req
  }
}
