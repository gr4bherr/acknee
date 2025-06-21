import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserInput, RefreshTokenInput, TokensDto } from './auth.dto'

@Controller('auth')
export class AuthContrller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: LoginUserInput): Promise<TokensDto> {
    return this.authService.login(input)
  }

  @Post('register')
  async register(@Body() input: LoginUserInput): Promise<TokensDto> {
    return this.authService.register(input)
  }

  @Post('refresh')
  async refresh(@Body() input: RefreshTokenInput): Promise<TokensDto> {
    return this.authService.refreshTokens(input.refreshToken)
  }
}
