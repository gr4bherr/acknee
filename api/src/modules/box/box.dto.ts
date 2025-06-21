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
