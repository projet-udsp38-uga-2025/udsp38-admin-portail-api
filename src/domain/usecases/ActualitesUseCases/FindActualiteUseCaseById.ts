import { injectable, inject } from 'tsyringe';
import type { ActualiteRepository } from '../../repositories/ActualiteRepository';
import type { ActualiteEntity } from '../../entities/ActualiteEntity';
import { TOKENS } from '@/infrastructure/config/tokens';

@injectable()
export class FindActualiteUseCaseById {
    constructor(
        @inject(TOKENS.IActualiteRepository)
        private actualiteRepository: ActualiteRepository
    ) {}

    async execute(id: number): Promise<ActualiteEntity | null> {
        return await this.actualiteRepository.findById(id);
    }
}