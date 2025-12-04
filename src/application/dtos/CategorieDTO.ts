import { Optional } from "@/shared/types/Optional.type";

export interface CategorieDTO {
    id: number;
    nom: string;
    description: Optional<string>;
}