import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { BoxModule } from './modules/box/box.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from './mikro-orm.config'
import { ConfigModule } from '@nestjs/config'
import { config } from './utils/config'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    AuthModule,
    BoxModule,
  ],
})
export class AppModule {}
