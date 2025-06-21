import { User } from '@/database/entities/user'
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private readonly userRepository: EntityRepository<User>

  constructor(private readonly em: EntityManager) {
    this.userRepository = this.em.getRepository(User)
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ id })
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email })
  }

  async create(email: string, password: string): Promise<User> {
    const user = new User(email, await bcrypt.hash(password, 10))
    await this.em.persistAndFlush(user)
    return user
  }
}
