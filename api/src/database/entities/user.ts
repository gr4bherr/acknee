import { Collection, EntitySchema } from '@mikro-orm/core'
import { Order } from './order'

export enum UserRole {
  'Supplier' = 'supplier',
  'Customer' = 'customer',
}

export class User {
  id: number
  email: string
  password: string
  role: UserRole
  orders = new Collection<Order>(this)

  constructor(
    email: string,
    password: string,
    role: UserRole = UserRole.Supplier
  ) {
    this.email = email
    this.password = password
    this.role = role
  }
}

export const userSchema = new EntitySchema<User>({
  class: User,
  properties: {
    id: { type: 'int', primary: true },
    email: { type: 'string' },
    password: { type: 'string' },
    role: {
      type: 'enum',
      nativeEnumName: 'user_role',
      items: Object.values(UserRole),
      default: UserRole.Supplier,
    },
    orders: {
      kind: '1:m',
      entity: () => Order,
      mappedBy: (order) => order.user,
    },
  },
})
