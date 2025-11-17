export const dynamic = "force-dynamic";
import ActualitesView from "@/ui/views/ActualitesView";
import { listActualitesAction } from "@/ui/actions/ActualiteActions";
import { archiverActualiteAction } from "@/ui/actions/ActualiteActions";

export default async function ActualitesPage() {
  const actualites = await listActualitesAction();
  
  return <ActualitesView actualites={actualites} archiverActualite={archiverActualiteAction} />;
}