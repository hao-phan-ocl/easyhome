import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt-strategy/jwt.strategy'
import { LocalStrategy } from './local-strategy/local.strategy'
import { UsersModule } from 'src/users/users.module'
import { GoogleStrategy } from './google-strategy/google.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
