import { CategorieEntity } from '@/domain/entities/CategorieEntity';
import { CategorieRepository } from '@/domain/repositories/CategorieRepository';
import prisma from '../lib/prisma';
import { injectable } from 'tsyringe';


@injectable()
export class CategoriePrismaRepository implements CategorieRepository {
    async findById(id: number): Promise<CategorieEntity | null> {
        const categorie = await prisma.categorie.findUnique({ where: { id } });
       return categorie ? new CategorieEntity(categorie.id, categorie.nom ?? '', categorie.description??'') : null;
    } 
    async create(input: { nom: string; description: string }): Promise<CategorieEntity> {
        const categorie = await prisma.categorie.create({
            data: {
            nom: input.nom,
            description: input.description,
            },
        });
        return new CategorieEntity(categorie.id, categorie.nom ?? '', categorie.description ?? '');
    }

    async update(id: number, input: { nom: string; description: string }): Promise<CategorieEntity> {
        const categorie = await prisma.categorie.update({
        where: { id },
        data: {
            nom: input.nom,
            description: input.description,
        },
        });
        return new CategorieEntity(categorie.id, categorie.nom ?? '', categorie.description ?? '');
    }

   async delete(id: number): Promise<void> {
     await prisma.categorie.delete({ where: { id } });
    }

    async findAll(): Promise<CategorieEntity[]> {
        const categories = await prisma.categorie.findMany({ orderBy: { id: "asc" } });
        return categories.map(categorie => new CategorieEntity(categorie.id, categorie.nom ?? '', categorie.description ?? ''));
    }

}