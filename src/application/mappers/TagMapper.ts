import { TagEntity } from "@/domain/entities/TagEntity";
import { TagCreatableOptionDTO } from "../dtos/TagCreatableOptionDTO";
import { TagDTO } from "../dtos/TagDTO";

export class TagMapper {
    static toCreatableOptionDTO(tag: TagEntity): TagCreatableOptionDTO {
        return {
            value: String(tag.id), 
            label: tag.libelle!.toLowerCase()
        };
    }

    static toDTO(tag: TagEntity): TagDTO | undefined{
        if (!tag)
            return undefined;
        return {
            value: String(tag.id),
            label: tag.libelle!
        };
    }
}