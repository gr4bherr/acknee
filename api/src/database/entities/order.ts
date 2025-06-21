import { EntitySchema } from '@mikro-orm/core'
import { User } from './user'
import { Package } from './package'

export class Order {
  id: number
  user: User
  package: Package | null

  constructor(user: User) {
    this.user = user
  }
}

export const orderSchema = new EntitySchema<Order>({
  class: Order,
  properties: {
    id: { type: 'int', primary: true },
    user: { kind: 'm:1', entity: () => User },
    package: { kind: '1:1', entity: () => Package, nullable: true },
  },
})
