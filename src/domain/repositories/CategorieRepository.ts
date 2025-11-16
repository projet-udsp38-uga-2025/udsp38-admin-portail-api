import { CategorieEntity } from "../entities/CategorieEntity";

export interface CategorieRepository {
    findAll(): Promise<CategorieEntity[]>; 
    findById(id: number): Promise<CategorieEntity | null>;
    create(input: { nom: string; description: string }): Promise<CategorieEntity> ;
    update(id: number, input: { nom: string; description: string }): Promise<CategorieEntity> ;
    delete(id: number): Promise<void>;
}