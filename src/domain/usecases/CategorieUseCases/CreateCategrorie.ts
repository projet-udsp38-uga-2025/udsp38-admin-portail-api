import { CategorieEntity } from "@/domain/entities/CategorieEntity";
import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";
import { TOKENS } from "@/infrastructure/config/tokens";
import { inject, injectable } from "tsyringe";


@injectable()
export class CreateCategorie {
  constructor(
    @inject(TOKENS.ICategorieRepository)
    private readonly repository: CategorieRepository
  ) {}

  execute(input: { nom: string; description: string }): Promise<CategorieEntity> {
    const {nom, description} = input;
    return this.repository.create({ nom, description });
  }
}