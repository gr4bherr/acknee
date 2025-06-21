import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { BoxService } from './box.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { BoxDistanceDto, BoxDto, OpenBoxInput } from './box.dto'
import { PaginatedDto } from '@/utils/pagination'
import {
  LatitudePipe,
  LongitudePipe,
  PageAndLimitPipe,
} from '@/utils/validation.pipes'
import { SuccessDto } from '@/utils/dtos'
import { PackageService } from '../package/package.service'

@Controller('box')
@UseGuards(JwtAuthGuard)
export class BoxController {
  constructor(
    private readonly boxService: BoxService,
    private readonly packageService: PackageService
  ) {}

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

  @Get(':boxId')
  async getBoxDetail(
    @Param('boxId', ParseIntPipe) boxId: number
  ): Promise<BoxDto> {
    return this.boxService.findById(boxId)
  }

  @Post(':boxId/open')
  async openBox(
    @Param('boxId', ParseIntPipe) boxId: number,
    @Body() input: OpenBoxInput
  ): Promise<SuccessDto> {
    const pack = await this.packageService.findByCode(input.packageCode)
    const box = await this.boxService.findById(boxId)

    const canOpen = await this.boxService.open(box, pack)
    return new SuccessDto(canOpen)
  }

  @Post(':boxId/closed')
  async boxClosed(
    @Param('boxId', ParseIntPipe) boxId: number,
    @Body() input: OpenBoxInput
  ): Promise<SuccessDto> {
    const pack = await this.packageService.findByCode(input.packageCode, [
      'order',
      'order.user',
    ])
    const box = await this.boxService.findById(boxId)

    const canOpen = await this.boxService.onClosed(box, pack)
    return new SuccessDto(canOpen)
  }
}
