import { Controller, Get, Post } from '@nestjs/common'
import { BoxService } from './box.service'

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get('list')
  async getList() {}

  @Get(':boxCode/detail')
  async getBoxDetail() {}

  @Post(':boxCode/open')
  async openBox() {}

  @Post(':boxCode/closed')
  async boxClosed() {}
}
