import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { BoxModule } from './modules/box/box.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import mikroOrmConfig from './mikro-orm.config'
import { ConfigModule } from '@nestjs/config'
import { config } from './utils/config'
import { PackageModule } from './modules/package/package.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),

    AuthModule,
    BoxModule,
    PackageModule,
    UserModule,
  ],
})
export class AppModule {}
