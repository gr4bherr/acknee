import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthContrller } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [JwtModule, UserModule, PassportModule],
  controllers: [AuthContrller],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
