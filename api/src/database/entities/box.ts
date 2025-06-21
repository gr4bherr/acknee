import { EntitySchema, Type } from '@mikro-orm/core'

export class GeographyPointType extends Type<
  { lon: number; lat: number },
  string
> {
  getColumnType() {
    return 'geography(POINT, 4326)'
  }

  convertToDatabaseValue(value: { lon: number; lat: number }): string {
    return `SRID=4326;POINT(${value.lon} ${value.lat})`
  }

  convertToJSValue(value: string): { lon: number; lat: number } {
    const matches = value.match(/POINT\((-?\d+\.?\d*)\s(-?\d+\.?\d*)\)/)
    if (!matches) throw new Error('Invalid geography point format')
    return { lon: parseFloat(matches[1]), lat: parseFloat(matches[2]) }
  }
}

export class Box {
  id: number
  identifier: string
  geom: { lat: number; lon: number }

  constructor(identifier: string, lat: number, lon: number) {
    this.identifier = identifier
    this.geom = { lat, lon }
  }
}

export const boxSchema = new EntitySchema<Box>({
  class: Box,
  properties: {
    id: { type: 'int', primary: true },
    identifier: { type: 'string' },
    geom: { type: GeographyPointType },
  },
})
