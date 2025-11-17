import { inject, injectable } from "tsyringe";
import { ActualiteEntity } from "../../entities/ActualiteEntity";
import type { ActualiteRepository } from "../../repositories/ActualiteRepository";
import { TOKENS } from "@/infrastructure/config/tokens";

@injectable()
export class ListAllActualitesUseCase {
    constructor(
        @inject(TOKENS.IActualiteRepository) private readonly actualiteRepository: ActualiteRepository
    ) {}
    
    async execute(): Promise<ActualiteEntity[]> {
        return this.actualiteRepository.findAllActualites();
    }
}