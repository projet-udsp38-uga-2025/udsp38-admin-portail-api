import { inject,injectable } from 'tsyringe';
import { CategorieEntity } from '@/domain/entities/CategorieEntity';
import  type { CategorieRepository } from '@/domain/repositories/CategorieRepository';         
import { TOKENS } from '@/infrastructure/config/tokens';

@injectable()
export class FindAllCategories {
    constructor(
    @inject(TOKENS.ICategorieRepository)
    private readonly repo: CategorieRepository
  ) {}
  execute(): Promise<CategorieEntity[]> {
    return this.repo.findAll();
  }
}
