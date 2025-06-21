import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

@Module({
  controllers: [AbortController],
  providers: [AuthService],
})
export class AuthModule {}
