import { EntitySchema } from '@mikro-orm/core'

export class Box {
  id: number
  identifier: string

  // todo: to be changed
  latitude: number
  longitude: number

  constructor(identifier: string, latitude: number, longitude: number) {
    this.identifier = identifier
    this.latitude = latitude
    this.longitude = longitude
  }
}

export const boxSchema = new EntitySchema<Box>({
  class: Box,
  properties: {
    id: { type: 'int', primary: true },
    identifier: { type: 'string' },
    latitude: { type: 'float' },
    longitude: { type: 'float' },
  },
})
