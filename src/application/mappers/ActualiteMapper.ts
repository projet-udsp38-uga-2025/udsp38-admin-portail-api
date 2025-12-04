import { ActualiteEntity } from "@/domain/entities/ActualiteEntity";
import { ActualiteDTO } from "../dtos/ActualiteDTO";
import { ActualiteListDTO } from "../dtos/ActualiteListDTO";
import { TagMapper } from "./TagMapper";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { TagEntity } from "@/domain/entities/TagEntity";

export class ActualiteMapper {

    static toActualiteDTO(entity: ActualiteEntity): ActualiteDTO {
        return {
            id: entity.id,
            dateCreation: entity.dateCreation,
            dateModification: entity.dateModification,
            datePublication: entity.datePublication,
            dateExpiration: entity.dateExpiration,
            statut: entity.statut,
            titre: entity.titre,
            description: entity.description,
            imageUrl: entity.imageUrl,
            idCategorie: entity.idCategorie,
            tags: entity.tags?.map(tag => TagMapper.toDTO(tag)!)
        };
    }

    static toActualiteListDTO(entity: ActualiteEntity): ActualiteListDTO {
        return {
            id: entity.id,
            titre: entity.titre,
            imageUrl: entity.imageUrl,
            dateCreation: entity.dateCreation?.toISOString() || null,
            dateModification: entity.dateModification?.toISOString() || null,
            datePublication: entity.datePublication?.toISOString() || null,
            statut: entity.statut,
        };
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static toEntity(prismaActualite: any): ActualiteEntity {
        const entity = new ActualiteEntity({
            id: prismaActualite.id,
            dateCreation: prismaActualite.publication.date_creation,
            dateModification: prismaActualite.publication.date_modification,
            datePublication: prismaActualite.publication.date_publication,
            dateExpiration: prismaActualite.publication.date_expiration,
            statut: prismaActualite.publication.statut as StatutPublication,
            titre: prismaActualite.publication.titre,
            description: prismaActualite.publication.description,
            imageUrl: prismaActualite.publication.image_url,
            idCategorie: prismaActualite.publication.id_categorie,
        });

        if (prismaActualite.publication.tagsDePublications) {
            const tags = prismaActualite.publication.tagsDePublications.map((tagPub: { tag: { id: number; libelle: string; }; }) =>
                new TagEntity({
                    id: tagPub.tag.id,
                    libelle: tagPub.tag.libelle
                })
            );
            entity.setTags(tags);
        }

        return entity;
    }
}