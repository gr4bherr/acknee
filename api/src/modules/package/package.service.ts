import { Package } from '@/database/entities/package'
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class PackageService {
  private readonly packageRepository: EntityRepository<Package>

  constructor(private readonly em: EntityManager) {
    this.packageRepository = this.em.getRepository(Package)
  }

  async findByCode(
    code: string,
    populate: ('order' | 'order.user')[] = []
  ): Promise<Package> {
    try {
      return await this.packageRepository.findOneOrFail({ code }, { populate })
    } catch {
      throw new NotFoundException(`package with code ${code} not found`)
    }
  }
}
