import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '@/modules/user/user.service'
import { Request } from 'express'
import { User, UserRole } from '@/database/entities/user'
import { JwtPayload } from './auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: JwtStrategy.extractJwtFromRequest,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    })
  }

  private static extractJwtFromRequest(req: Request): string | null {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(req) || null
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.userId)
    if (user.role !== UserRole.Supplier) {
      throw new UnauthorizedException(
        'user has to be a supplier to operate boxes'
      )
    }

    return user
  }
}
