import { EntitySchema } from '@mikro-orm/core'

export class User {
  id: number
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export const userSchema = new EntitySchema<User>({
  class: User,
  properties: {
    id: { type: 'int', primary: true },
    username: { type: 'string' },
    password: { type: 'string' },
  },
})
