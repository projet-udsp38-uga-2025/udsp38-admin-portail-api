import { inject, injectable } from "tsyringe";
import { ActualiteEntity } from "../../entities/ActualiteEntity";
import type { ActualiteRepository } from "../../repositories/ActualiteRepository";

@injectable()
export class ListAllActualitesUseCase {
    constructor(
        @inject('IActualiteRepository') private readonly actualiteRepository: ActualiteRepository
    ) {}
    
    async execute(): Promise<ActualiteEntity[]> {
        return this.actualiteRepository.findAllActualites();
    }
}