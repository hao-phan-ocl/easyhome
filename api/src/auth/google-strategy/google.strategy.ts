import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://hp-easyhome.herokuapp.com/oauth2/redirect/google',
      // callbackURL: configService.get<string>('CALLBACK_URL'),
      // callbackURL: `${configService.get<string>(
      //   'HOST_URL_BACKEND',
      // )}/oauth2/redirect/google`,
      scope: ['profile', 'email'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      accessToken,
    }

    return user // this will be returned as req.user by passportjs
  }
}
