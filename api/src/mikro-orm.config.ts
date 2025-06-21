import * as dotenv from 'dotenv'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/core'
import { SeedManager } from '@mikro-orm/seeder'

dotenv.config()

const isLocal = process.env.APP_ENV === 'local'

export default defineConfig<PostgreSqlDriver>({
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  debug: false,
  extensions: [Migrator, SeedManager],
  driverOptions: {
    ...(!isLocal && {
      connection: {
        ssl: { rejectUnauthorized: false },
      },
    }),
  },
  entities: ['./dist/database/entities/*.js'],
  entitiesTs: ['./src/database/entities/*.ts'],
  migrations: {
    snapshot: false,
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  //   seeder: {
  //     defaultSeeder: DevSeeder.name,
  //     path: './dist/database/seeders',
  //     pathTs: './src/database/seeders',
  //     glob: '!(*.d).{js,ts}',
  //     emit: 'ts',
  //     fileName: (className: string) => className,
  //   },
})
