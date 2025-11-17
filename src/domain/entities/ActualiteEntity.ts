import { Optional } from "@/shared/types/Optional.type";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { TagEntity } from "./TagEntity";

export class ActualiteEntity {
    id: Optional<number>;
    dateCreation: Optional<Date>;
    dateModification: Optional<Date>;
    datePublication: Optional<Date>;
    dateExpiration: Optional<Date>;
    statut: Optional<StatutPublication>;
    titre: Optional<string>;
    description: Optional<string>;
    imageUrl: Optional<string>;
    idCategorie: Optional<number>;
    tags: Optional<TagEntity[]>;

    constructor(props: {
        id?: Optional<number>,
        dateCreation?: Optional<Date>,
        titre?: Optional<string>,
        statut?: Optional<StatutPublication>,
        dateModification?: Optional<Date>,
        datePublication?: Optional<Date>,
        dateExpiration?: Optional<Date>,
        description?: Optional<string>,
        imageUrl?: Optional<string>,
        idCategorie?: Optional<number>
    }
    ) {
        this.id = props.id;
        this.dateCreation = props.dateCreation;
        this.titre = props.titre;
        this.statut = props.statut;
        this.dateModification = props.dateModification;
        this.datePublication = props.datePublication;
        this.dateExpiration = props.dateExpiration;
        this.description = props.description;
        this.imageUrl = props.imageUrl;
        this.idCategorie = props.idCategorie;
    }

    archiver(): void {
        this.statut = StatutPublication.ARCHIVE;
        this.dateModification = new Date();
    }

    setTags(tags: TagEntity[]): void {
        this.tags = tags;
    }

}