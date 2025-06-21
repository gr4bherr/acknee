import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '@/modules/user/user.service'
import { Request } from 'express'
import { User } from '@/database/entities/user'
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
    return await this.userService.findById(payload.userId)
  }
}
