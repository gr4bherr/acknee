import { EntitySchema } from '@mikro-orm/core'

export class Package {
  id: number
  code: string

  constructor(code: string) {
    this.code = code
  }
}

export const boxSchema = new EntitySchema<Package>({
  class: Package,
  properties: {
    id: { type: 'int', primary: true },
    code: { type: 'string' },
  },
})
