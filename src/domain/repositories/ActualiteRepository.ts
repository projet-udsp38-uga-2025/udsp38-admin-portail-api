import { ActualiteEntity } from "../entities/ActualiteEntity";

export interface ActualiteRepository {
    findAllActualites(): Promise<ActualiteEntity[]>;
    findById(id: number): Promise<ActualiteEntity | null>;
    update(id: number, actualite: ActualiteEntity): Promise<ActualiteEntity>;
    archiver(id: number): Promise<void>;
}