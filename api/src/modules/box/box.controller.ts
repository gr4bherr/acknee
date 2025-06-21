import {
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { BoxService } from './box.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { BoxDistanceDto } from './box.dto'
import { PaginatedDto } from '@/utils/pagination'
import {
  LatitudePipe,
  LongitudePipe,
  PageAndLimitPipe,
} from '@/utils/validation.pipes'

@Controller('box')
@UseGuards(JwtAuthGuard)
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get('list')
  async getList(
    @Query('lat', new LatitudePipe()) lat: number,
    @Query('lon', new LongitudePipe()) lon: number,
    @Query('search') search?: string,
    @Query('page', new PageAndLimitPipe()) page?: number,
    @Query('limit', new PageAndLimitPipe()) limit?: number
  ): Promise<PaginatedDto<BoxDistanceDto>> {
    const paginated = await this.boxService.findWithDistance({
      lat,
      lon,
      search,
      limit,
      page,
    })
    return new PaginatedDto(paginated, paginated.data)
  }

  @Get(':boxCode/detail')
  async getBoxDetail() {}

  @Post(':boxCode/open')
  async openBox() {}

  @Post(':boxCode/closed')
  async boxClosed() {}
}
