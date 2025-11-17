import { container } from "tsyringe";
import { FindAllCategories } from "@/domain/usecases/CategorieUseCases/FindAllCategories";
import { CreateCategorie } from "@/domain/usecases/CategorieUseCases/CreateCategrorie";
import { UpdateCategorie } from "@/domain/usecases/CategorieUseCases/UpdateCategorie";
import { DeleteCategorie } from "@/domain/usecases/CategorieUseCases/DeleteCategorie";
import { CategorieDTO } from "../dtos/CategorieDTO";
import { CategorieMapper } from "../mappers/CategorieMapper";

export class CategorieService {

  async getAllCategories(): Promise<CategorieDTO[]> {
    const findAllCategoriesUseCase = container.resolve(FindAllCategories);
    const categories = await findAllCategoriesUseCase.execute(); 
    return categories.map(categorie => CategorieMapper.toCategorieDTO(categorie));
  }

  async create(input: { nom: string; description: string }) {
    const createCategorieUseCase = container.resolve(CreateCategorie);
    return createCategorieUseCase.execute(input);
  } 

  async update(id: number, input: { nom: string; description: string }) {
    const updateCategorieUseCase = container.resolve(UpdateCategorie);
    return updateCategorieUseCase.execute(id, input);
  } 


  async delete(id: number) {
    const deleteCategorieUseCase = container.resolve(DeleteCategorie);
    return deleteCategorieUseCase.execute(id);
  }

  async getCategorieById(id: number) {
    const categories = await this.getAllCategories();
    return categories.find((categorie) => categorie.id === id) || null;
  }


}
