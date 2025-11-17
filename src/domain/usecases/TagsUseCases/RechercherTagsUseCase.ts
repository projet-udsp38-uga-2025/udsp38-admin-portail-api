import { TagEntity } from "@/domain/entities/TagEntity";
import type { TagRepository } from "@/domain/repositories/TagRepository";
import { TOKENS } from "@/infrastructure/config/tokens";
import { inject, injectable } from "tsyringe";

@injectable()
export class RechercherTagsUseCase {
    constructor(
        @inject(TOKENS.ITagRepository) private readonly tagRepository: TagRepository
    ) {}

    async execute(value: string): Promise<TagEntity[]> {
        return await this.tagRepository.search(value);
    }
}