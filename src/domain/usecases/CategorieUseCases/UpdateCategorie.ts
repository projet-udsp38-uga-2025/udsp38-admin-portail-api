import { inject, injectable } from "tsyringe";
import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";
import { TOKENS } from "@/infrastructure/config/tokens";

@injectable()
export class UpdateCategorie {
  constructor(
    @inject(TOKENS.ICategorieRepository)
    private readonly repository: CategorieRepository
  ) {}

  execute(id: number, input: { nom: string; description: string }) {
    return this.repository.update(id, {
      nom: input.nom.trim(),
      description: input.description.trim(),
    });
  }
}
