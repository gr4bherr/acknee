import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload, LoginUserInput, TokensDto } from './auth.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { User } from '@/database/entities/user'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  private async getJwtToken(user: User): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id, userEmail: user.email },
        {
          secret: this.configService.get<string>('jwtAccessSecret'),
          expiresIn: this.configService.get<string>('jwtAccessExpiresIn'),
        }
      ),
      this.jwtService.signAsync(
        { userId: user.id, userEmail: user.email },
        {
          secret: this.configService.get<string>('jwtRefreshSecret'),
          expiresIn: this.configService.get<string>('jwtRefreshExpiresIn'),
        }
      ),
    ])

    return new TokensDto(accessToken, refreshToken)
  }

  async login(input: LoginUserInput): Promise<TokensDto> {
    const { email, password } = input
    const user = await this.userService.findByEmail(email)

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return this.getJwtToken(user)
      }
    }

    throw new UnauthorizedException()
  }

  async register(input: LoginUserInput): Promise<TokensDto> {
    const { email, password } = input

    if (await this.userService.findByEmail(email)) {
      throw new ForbiddenException(`user with email: ${email} already exists`)
    }

    const user = await this.userService.create(email, password)

    return this.getJwtToken(user)
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        { secret: this.configService.get<string>('jwtRefreshSecret') }
      )

      if (payload.userId) {
        const user = await this.userService.findById(payload.userId)
        return this.getJwtToken(user)
      }
      throw new UnauthorizedException()
    } catch {
      throw new ForbiddenException('refresh token not valid')
    }
  }
}
