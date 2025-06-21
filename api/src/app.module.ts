import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { BoxModule } from './modules/box/box.module'

@Module({
  imports: [AuthModule, BoxModule],
})
export class AppModule {}
