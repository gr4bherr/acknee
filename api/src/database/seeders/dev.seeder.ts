import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { User } from '../entities/user'
import * as bcrypt from 'bcrypt'
import { boxLocationData } from './data'
import { Box } from '../entities/box'

export class DevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = new User('user1', await bcrypt.hash('password1', 10))
    em.persist(user)

    const boxes = boxLocationData.map((boxLocation) => {
      const box = new Box(
        boxLocation.identifier,
        +boxLocation.lat,
        +boxLocation.lon
      )
      return box
    })

    em.persist(boxes)

    await em.flush()
  }
}
