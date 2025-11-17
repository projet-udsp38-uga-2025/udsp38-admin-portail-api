import 'reflect-metadata';
import { container } from "tsyringe";
import { ArchiverActualiteUseCase } from '@/domain/usecases/ActualitesUseCases/ArchiverActualiteUseCase';
import { ListAllActualitesUseCase } from '@/domain/usecases/ActualitesUseCases/ListAllActualitesUseCase';
import { ActualiteMapper } from '../mappers/ActualiteMapper';
import { injectable } from 'tsyringe';

@injectable()  
export class ActualiteService {  
    async listActualites() {
        const listAllActualitesUseCase = container.resolve(ListAllActualitesUseCase);
        const actualites = await listAllActualitesUseCase.execute();
        return actualites.map(actualite => ActualiteMapper.toActualiteListDTO(actualite));
    }
    
    async archiver(id: number): Promise<void> {
        const archiverActualiteUseCase = container.resolve(ArchiverActualiteUseCase);
        await archiverActualiteUseCase.execute(id);
    }
}