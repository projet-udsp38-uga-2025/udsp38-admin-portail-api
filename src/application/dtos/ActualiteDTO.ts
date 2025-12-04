import { Optional } from "@/shared/types/Optional.type";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import { CategorieDTO } from "./CategorieDTO";
import { TagDTO } from "./TagDTO";

export interface ActualiteDTO {
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
    categorie?: CategorieDTO;
    tags?: TagDTO[];
}