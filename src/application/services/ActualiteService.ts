import { container } from "tsyringe";
import { ArchiverActualiteUseCase } from '@/domain/usecases/ActualitesUseCases/ArchiverActualiteUseCase';
import { ListAllActualitesUseCase } from '@/domain/usecases/ActualitesUseCases/ListAllActualitesUseCase';
import { ActualiteMapper } from '../mappers/ActualiteMapper';
import { FindActualiteUseCaseById } from '@/domain/usecases/ActualitesUseCases/FindActualiteUseCaseById';
import { injectable } from 'tsyringe';
import { CreerActualite } from '@/shared/types/CreerActualite.type';
import { CreerActualiteUseCase } from '@/domain/usecases/ActualitesUseCases/CreerActualiteUseCase';
import { ActualiteDTO } from '../dtos/ActualiteDTO';

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

    async findById(id: number): Promise<ActualiteDTO | null> {
        const findActualiteByIdUseCaseById = container.resolve(FindActualiteUseCaseById);
        const actualite = await findActualiteByIdUseCaseById.execute(id);
        
        if (!actualite) {
            return null;
        }
        
        return ActualiteMapper.toActualiteDTO(actualite);
    }

    async creerActualite(data: CreerActualite): Promise<ActualiteDTO> {
        try {
            const creerActualiteUseCase = container.resolve(CreerActualiteUseCase);
            const actualite = await creerActualiteUseCase.execute(data);
            return ActualiteMapper.toActualiteDTO(actualite);
        } catch {
            throw new Error();
        }
    }
}