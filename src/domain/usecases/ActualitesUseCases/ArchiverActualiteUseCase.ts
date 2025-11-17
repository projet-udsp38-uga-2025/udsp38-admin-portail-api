import { injectable, inject } from 'tsyringe';
import type { ActualiteRepository } from '../../repositories/ActualiteRepository';

@injectable()
export class ArchiverActualiteUseCase {
    constructor(
        @inject('IActualiteRepository')
        private actualiteRepository: ActualiteRepository
    ) {}

    async execute(id: number): Promise<void> {
        const actualite = await this.actualiteRepository.findById(id);
        
        if (!actualite) {
            throw new Error('Actualité non trouvée');
        }
        actualite.archiver();
        
        await this.actualiteRepository.update(id, actualite);
    }
}