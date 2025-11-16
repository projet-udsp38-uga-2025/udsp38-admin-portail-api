
import { CategorieEntity } from "@/domain/entities/CategorieEntity";
import { CategorieDTO } from "../dtos/CategorieDTO";

export class CategorieMapper {
    static toCategorieDTO(categorie: CategorieEntity): CategorieDTO {
        return {
            id: categorie.id,
            nom: categorie.nom,
            description: categorie.description,
        };
    } 

} 

