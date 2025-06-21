import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { BoxService } from './box.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('box')
@UseGuards(JwtAuthGuard)
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
