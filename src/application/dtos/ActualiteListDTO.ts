import { Optional } from "@/shared/types/Optional.type";
import { StatutPublication } from "@/shared/enums/StatutPublication";

export type ActualiteListDTO = {
    id: number;
    titre: string;
    imageUrl: Optional<string>;
    dateCreation: string;
    dateModification: Optional<string>;
    datePublication: Optional<string>;
    statut: StatutPublication;
}