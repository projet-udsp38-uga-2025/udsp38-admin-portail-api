import { ActualiteEntity } from "@/domain/entities/ActualiteEntity";
import type { ActualiteRepository } from "@/domain/repositories/ActualiteRepository";
import { ActualiteMapper } from "@/application/mappers/ActualiteMapper";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import prisma from "../lib/prisma";
import { injectable } from "tsyringe";

@injectable()
export class ActualitePrismaRepository implements ActualiteRepository {
    async findAllActualites(): Promise<ActualiteEntity[]> {
        const actualites = await prisma.actualite.findMany({
            include: {
                publication: {
                    include: {
                        tagsDePublications: {
                            include: {
                                tag: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                publication: {
                    date_creation: 'desc'
                }
            }
        });

        return actualites.map(actualite => ActualiteMapper.toEntity(actualite));
    }

    async findById(id: number): Promise<ActualiteEntity | null> {
        const actualite = await prisma.actualite.findUnique({
            where: { id },
            include: {
                publication: {
                    include: {
                        tagsDePublications: {
                            include: {
                                tag: true
                            }
                        }
                    }
                }
            }
        });

        if (!actualite) {
            return null;
        }

        return ActualiteMapper.toEntity(actualite);
    }

    async update(id: number, actualite: ActualiteEntity): Promise<ActualiteEntity> {
        await prisma.publication.update({
            where: { id: actualite.id! },
            data: {
                statut: actualite.statut,
                date_modification: actualite.dateModification,
                titre: actualite.titre!,
                description: actualite.description,
                image_url: actualite.imageUrl,
                date_publication: actualite.datePublication,
                date_expiration: actualite.dateExpiration,
                id_categorie: actualite.idCategorie
            }
        });

        const updatedActualite = await prisma.actualite.findUnique({
            where: { id },
            include: {
                publication: {
                    include: {
                        tagsDePublications: {
                            include: {
                                tag: true
                            }
                        }
                    }
                }
            }
        });

        return ActualiteMapper.toEntity(updatedActualite!);
    }

    async archiver(id: number): Promise<void> {
        const actualite = await prisma.actualite.findUnique({
            where: { id },
            include: { publication: true }
        });

        if (!actualite) {
            throw new Error('Actualité non trouvée');
        }

        await prisma.publication.update({
            where: { id: actualite.id_publication },
            data: {
                statut: StatutPublication.ARCHIVE,
                date_modification: new Date()
            }
        });
    }

    async create(actualite: ActualiteEntity): Promise<ActualiteEntity> {
        const nouvelleActualite = await prisma.actualite.create({
            data: {
                publication: {
                    create: {
                        titre: actualite.titre!,
                        description: actualite.description,
                        statut: actualite.statut,
                        date_creation: new Date(),
                        date_modification: new Date(),
                        image_url: actualite.imageUrl,
                        date_publication: actualite.datePublication,
                        date_expiration: actualite.dateExpiration,
                        id_categorie: actualite.idCategorie,
                        tagsDePublications: {
                            create: actualite.tags?.map(tag => ({
                                tag: {
                                    connect: { id: tag.id! }
                                }
                            }))
                        }
                    }
                },
            },
            include: {
                publication: {
                    include: {
                        tagsDePublications: {
                            include: {
                                tag: true
                            }
                        }
                    }
                }
            }
        });

        return ActualiteMapper.toEntity(nouvelleActualite);
    }
}