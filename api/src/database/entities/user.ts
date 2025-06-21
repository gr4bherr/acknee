import { EntitySchema } from '@mikro-orm/core'

export class User {
  id: number
  email: string
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}

export const userSchema = new EntitySchema<User>({
  class: User,
  properties: {
    id: { type: 'int', primary: true },
    email: { type: 'string' },
    password: { type: 'string' },
  },
})
