import { TagEntity } from "@/domain/entities/TagEntity";
import { TagCreatableOptionDTO } from "../dtos/TagCreatableOptionDTO";

export class TagMapper {
    static toCreatableOptionDTO(tag: TagEntity): TagCreatableOptionDTO {
        return {value: String(tag.id), label: tag.libelle!.toLocaleLowerCase()}
    }
}