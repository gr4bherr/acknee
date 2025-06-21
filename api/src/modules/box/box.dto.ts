import { IsString } from 'class-validator'

// * input *

export class OpenBoxInput {
  @IsString()
  packageCode: string
}

// * output *

export interface BoxDistanceDto {
  id: number
  identifier: string
  geom: { lat: number; lon: number }
  distance: number
}

export interface BoxDto {
  id: number
  identifier: string
  geom: { lat: number; lon: number }
}
