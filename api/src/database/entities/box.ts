import { EntitySchema, Type } from '@mikro-orm/core'
import wkx from 'wkx'

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
    if (!value) {
      return null
    }

    const buffer = Buffer.from(value, 'hex')
    const geom = wkx.Geometry.parse(buffer)

    if (geom instanceof wkx.Point) {
      return { lon: geom.x, lat: geom.y }
    }

    throw new Error('Invalid geography point format: not a Point geometry')
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
