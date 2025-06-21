import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MikroORM } from '@mikro-orm/core'
import mikroOrmConfig from './mikro-orm.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const orm = await MikroORM.init(mikroOrmConfig)
  const migrator = orm.getMigrator()
  await migrator.up()
  await orm.close(true)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
