import { ActualiteEntity } from "@/domain/entities/ActualiteEntity";
import { ActualiteListDTO } from "../dtos/ActualiteListDTO";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { Prisma } from "@/infrastructure/database/prisma/core/client";

type ActualiteWithPublication = Prisma.ActualiteGetPayload<{
    include: { publication: true }
}>;

export class ActualiteMapper {
    static toEntity(actualite: ActualiteWithPublication): ActualiteEntity {
        return new ActualiteEntity(
            actualite.id,
            actualite.publication.date_creation,
            actualite.publication.titre,
            actualite.publication.statut as StatutPublication,
            actualite.publication.date_modification,
            actualite.publication.date_publication,
            actualite.publication.date_expiration,
            actualite.publication.description,
            actualite.publication.image_url,
            actualite.publication.id_categorie
        );
    }


    static toActualiteListDTO(actualite: ActualiteEntity): ActualiteListDTO {
        return {
            id: actualite.id,
            titre: actualite.titre,
            imageUrl: actualite.imageUrl,
            dateCreation: actualite.dateCreation.toISOString(),
            dateModification: actualite.dateModification?.toISOString() || null,
            datePublication: actualite.datePublication?.toISOString() || null,
            statut: actualite.statut,
        };
    }
}