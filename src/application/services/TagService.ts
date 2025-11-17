import { RechercherTagsUseCase } from "@/domain/usecases/TagsUseCases/RechercherTagsUseCase";
import { container } from "tsyringe";
import { TagCreatableOptionDTO } from "../dtos/TagCreatableOptionDTO";
import { TagMapper } from "../mappers/TagMapper";

export class TagService {
    async rechercherTags(value: string): Promise<TagCreatableOptionDTO[]>  {
        const rechercherTagsUseCase = container.resolve(RechercherTagsUseCase);
        const tagEntities = await rechercherTagsUseCase.execute(value);

        return tagEntities.map(tag => TagMapper.toCreatableOptionDTO(tag));
    }
}