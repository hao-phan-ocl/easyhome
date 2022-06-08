import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { TenantsModule } from 'src/tenants/tenants.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local-strategy/local.strategy'
import { JwtStrategy } from './jwt-strategy/jwt.strategy'

@Module({
  imports: [
    forwardRef(() => TenantsModule), // to avoid circular dependency
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
