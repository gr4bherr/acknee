import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthContrller } from './auth.controller'

@Module({
  controllers: [AuthContrller],
  providers: [AuthService],
})
export class AuthModule {}
