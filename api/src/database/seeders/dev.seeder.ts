import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { User, UserRole } from '../entities/user'
import * as bcrypt from 'bcrypt'
import { boxLocationData } from './data'
import { Box } from '../entities/box'
import { Order } from '../entities/order'
import { Package } from '../entities/package'

export class DevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = new User(
      'user@test.com',
      await bcrypt.hash('acknee', 10),
      UserRole.Supplier
    )
    const customer = new User(
      'customer@test.com',
      await bcrypt.hash('acknee', 10)
    )
    em.persist([user, customer])

    const boxes = boxLocationData.map((boxLocation) => {
      const box = new Box(
        boxLocation.identifier,
        +boxLocation.lat,
        +boxLocation.lon
      )
      return box
    })
    em.persist(boxes)

    const order = new Order(customer)
    em.persist(order)

    const pack = new Package('1bo3j5b', order)
    order.package = pack
    em.persist(pack)

    await em.flush()
  }
}
