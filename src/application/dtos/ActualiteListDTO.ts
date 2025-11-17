import { Optional } from "@/shared/types/Optional.type";
import { StatutPublication } from "@/shared/enums/StatutPublication";

export type ActualiteListDTO = {
    id: Optional<number>;
    titre: Optional<string>;
    imageUrl: Optional<string>;
    dateCreation: Optional<string>;
    dateModification: Optional<string>;
    datePublication: Optional<string>;
    statut: Optional<StatutPublication>;
}