'use server';
import "reflect-metadata";
import "@/infrastructure/config/InjectionDependencies";
import { container } from "tsyringe";
import { CategorieService } from "@/application/services/CategorieService";
import { revalidatePath } from "next/cache";
import { CategorieDTO } from "@/application/dtos/CategorieDTO";
import { CategorieMapper } from "@/application/mappers/CategorieMapper";

export async function deleteCategorieAction(id: number) { 
    const service = container.resolve(CategorieService);
    await service.delete(id);
    revalidatePath("/categories");
}

export async function updateCategorieAction(id: number, input: { nom: string; description: string }) {
    const service = container.resolve(CategorieService);
    await service.update(id, input);
    revalidatePath("/categories");
}


export async function createCategorieAction(
  input: { nom: string; description: string }
): Promise<CategorieDTO> {
  const service = container.resolve(CategorieService);

  const created = await service.create(input); 

  revalidatePath("/categories");
  return CategorieMapper.toCategorieDTO(created);
}

export async function listCategoriesAction(): Promise<CategorieDTO[]> {
  const service = container.resolve(CategorieService);
  return await service.getAllCategories();
}