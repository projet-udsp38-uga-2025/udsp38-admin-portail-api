import { ActualiteEntity } from "@/domain/entities/ActualiteEntity";
import { ActualiteListDTO } from "../dtos/ActualiteListDTO";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { Prisma } from "@/infrastructure/database/prisma/core/client";
import { ActualiteDTO } from "../dtos/ActualiteDTO";

type ActualiteWithPublication = Prisma.ActualiteGetPayload<{
    include: { publication: true }
}>;

export class ActualiteMapper {
    static toEntity(actualite: ActualiteWithPublication): ActualiteEntity {
        return new ActualiteEntity({
            id: actualite.id,
            dateCreation: actualite.publication.date_creation,
            titre: actualite.publication.titre,
            statut: actualite.publication.statut as StatutPublication,
            dateModification: actualite.publication.date_modification,
            datePublication: actualite.publication.date_publication,
            dateExpiration: actualite.publication.date_expiration,
            description: actualite.publication.description,
            imageUrl: actualite.publication.image_url,
            idCategorie: actualite.publication.id_categorie,
        });
    }


    static toActualiteListDTO(actualite: ActualiteEntity): ActualiteListDTO {
        return {
            id: actualite.id,
            titre: actualite.titre,
            imageUrl: actualite.imageUrl,
            dateCreation: actualite.dateCreation?.toISOString() || null,
            dateModification: actualite.dateModification?.toISOString() || null,
            datePublication: actualite.datePublication?.toISOString() || null,
            statut: actualite.statut,
        };
    }

    static toActualiteDTO(actualite: ActualiteEntity): ActualiteDTO {
        return {
            id: actualite.id,
            titre: actualite.titre,
            description: actualite.description,
            imageUrl: actualite.imageUrl,
            dateCreation: actualite.dateCreation,
            dateModification: actualite.dateModification,
            datePublication: actualite.datePublication,
            dateExpiration: actualite.dateExpiration,
            statut: actualite.statut,
            idCategorie: actualite.idCategorie,
        };
    }
}