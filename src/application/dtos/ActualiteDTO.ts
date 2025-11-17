import { StatutPublication } from "@/shared/enums/StatutPublication"
import { Optional } from "@/shared/types/Optional.type"

export type ActualiteDTO = {
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