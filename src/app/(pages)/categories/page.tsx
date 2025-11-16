import { CategorieService } from "@/application/services/CategorieService";
import CategoriesView from "@/ui/views/CategoriesView";

export default async function CategoriesPage() {
  const service = new CategorieService();
  const categories = await service.getAllCategories();

  return <CategoriesView categories={categories} />;
}
