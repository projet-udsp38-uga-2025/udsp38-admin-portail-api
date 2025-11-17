export const dynamic = "force-dynamic";
import { listCategoriesAction } from "@/ui/actions/CategorieActions";
import CategoriesView from "@/ui/views/CategoriesView";

export default async function CategoriesPage() {
  const categories = await listCategoriesAction();

  return <CategoriesView categories={categories} />;
}
