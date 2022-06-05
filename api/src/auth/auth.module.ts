import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { TenantsModule } from 'src/tenants/tenants.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [TenantsModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
