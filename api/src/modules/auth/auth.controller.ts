import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthContrller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {}
}
