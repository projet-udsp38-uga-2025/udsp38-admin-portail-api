'use server';
import "reflect-metadata";
import "@/infrastructure/config/InjectionDependencies";
import { container } from "tsyringe";
import { TagService } from "../../application/services/TagService";
import { TagCreatableOptionDTO } from "../../application/dtos/TagCreatableOptionDTO";

export async function rechercherTagsAction(value: string): Promise<TagCreatableOptionDTO[]> {
    const tagService = container.resolve(TagService);
    return await tagService.rechercherTags(value);
}