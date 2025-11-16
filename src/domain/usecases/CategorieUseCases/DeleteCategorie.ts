import "reflect-metadata"
import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";
import { TOKENS } from "@/infrastructure/config/tokens";
import { inject, injectable } from "tsyringe";



@injectable()
export class DeleteCategorie {
  constructor(
    @inject(TOKENS.ICategorieRepository)
    private readonly repository: CategorieRepository
  ) {}

  execute(id: number) {
    return this.repository.delete(id);
  }
}
