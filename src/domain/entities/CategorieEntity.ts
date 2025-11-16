import { Optional } from "@/shared/types/Optional.type";


export class CategorieEntity {
    id: number;
    public nom: string;
    public description: Optional<string>;

    constructor(id: number, nom: string, description: string) {
        this.id = id;
        this.nom = nom;
        this.description = description;
    }
}