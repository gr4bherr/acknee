import { EntitySchema } from '@mikro-orm/core'
import { Order } from './order'

export class Package {
  id: number
  code: string
  order: Order

  constructor(code: string, order: Order) {
    this.code = code
    this.order = order
  }
}

export const packageSchema = new EntitySchema<Package>({
  class: Package,
  properties: {
    id: { type: 'int', primary: true },
    code: { type: 'string' },
    order: { kind: '1:1', entity: () => Order },
  },
})
