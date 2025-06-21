import { Box } from '@/database/entities/box'
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
} from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { BoxDistanceDto } from './box.dto'
import { Paginated } from '@/utils/pagination'
import { DEFAULT_PAGINATION_LIMIT } from '@/utils/constants'

@Injectable()
export class BoxService {
  private readonly boxRepository: EntityRepository<Box>

  constructor(private readonly em: EntityManager) {
    this.boxRepository = this.em.getRepository(Box)
  }

  async findWithDistance({
    lat,
    lon,
    search = '',
    limit = DEFAULT_PAGINATION_LIMIT,
    page = 1,
  }: {
    lat: number
    lon: number
    search: string
    limit: number
    page: number
  }): Promise<Paginated<BoxDistanceDto>> {
    const offset = page ? (page - 1) * limit : 0
    const total = await this.boxRepository.count()

    const data: BoxDistanceDto[] = await this.em.execute(
      `
      SELECT 
        id, 
        identifier,
        ST_X(geom::geometry) AS lon, 
        ST_Y(geom::geometry) AS lat,
        ST_Distance(geom, ST_SetSRID(ST_MakePoint(?, ?), 4326)) as distance
      FROM box
      WHERE geom IS NOT NULL
        AND identifier ILIKE CONCAT('%', ?, '%') 
      ORDER BY geom <-> ST_SetSRID(ST_MakePoint(?, ?), 4326)
      LIMIT ? OFFSET ?;
      `,
      [lon, lat, search, lon, lat, limit, offset]
    )

    return new Paginated(limit, page, total, data)
  }
}
