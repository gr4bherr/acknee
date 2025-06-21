import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { BoxModule } from './modules/box/box.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from './mikro-orm.config'

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), AuthModule, BoxModule],
})
export class AppModule {}
