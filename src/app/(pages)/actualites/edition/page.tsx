export const dynamic = "force-dynamic";
import { listCategoriesAction } from "@/ui/actions/CategorieActions";
import ActualiteEditionView from "@/ui/views/ActualiteEditionView";

export default async function ActualiteEdition() {
  const categories = await listCategoriesAction();

  return <ActualiteEditionView categories={categories}/>;
}