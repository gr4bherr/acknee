import { IsEmail, IsString } from 'class-validator'

// * input *

export class LoginUserInput {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class RefreshTokenInput {
  @IsString()
  refreshToken: string
}

// * output *

export class TokensDto {
  readonly accessToken: string
  readonly refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}

export interface JwtPayload {
  userId: number
  userEmail: string
}
