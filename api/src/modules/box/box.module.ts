import { Module } from '@nestjs/common'
import { BoxController } from './box.controller'
import { BoxService } from './box.service'
import { PackageModule } from '../package/package.module'

@Module({
  imports: [PackageModule],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
