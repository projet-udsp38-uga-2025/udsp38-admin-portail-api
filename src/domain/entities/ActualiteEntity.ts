import { Optional } from "@/shared/types/Optional.type";
import { StatutPublication } from "@/shared/enums/StatutPublication";

export class ActualiteEntity {
    id: number;
    dateCreation: Date;
    dateModification: Optional<Date>;
    datePublication: Optional<Date>;
    dateExpiration: Optional<Date>;
    statut: StatutPublication;
    titre: string;
    description: Optional<string>;
    imageUrl: Optional<string>;
    idCategorie: Optional<number>;

    constructor(
        id: number,
        dateCreation: Date,
        titre: string,
        statut: StatutPublication,
        dateModification: Optional<Date> = null,
        datePublication: Optional<Date> = null,
        dateExpiration: Optional<Date> = null,
        description: Optional<string> = null,
        imageUrl: Optional<string> = null,
        idCategorie: Optional<number> = null
    ) {
        this.id = id;
        this.dateCreation = dateCreation;
        this.titre = titre;
        this.statut = statut;
        this.dateModification = dateModification;
        this.datePublication = datePublication;
        this.dateExpiration = dateExpiration;
        this.description = description;
        this.imageUrl = imageUrl;
        this.idCategorie = idCategorie;
    }

    archiver(): void {
        this.statut = StatutPublication.ARCHIVE;
        this.dateModification = new Date();
    }
}