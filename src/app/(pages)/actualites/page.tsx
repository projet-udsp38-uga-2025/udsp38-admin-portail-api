import "reflect-metadata";
import "@/infrastructure/config/InjectionDependencies";
import ActualitesView from "@/ui/views/ActualitesView";
import { container } from "tsyringe";
import { ActualiteService } from "@/application/services/ActualiteService";
import { revalidatePath } from "next/cache";

async function archiverActualite(id: number) {
  "use server";
  const actualiteService = container.resolve(ActualiteService);
  await actualiteService.archiver(id);
  revalidatePath('/actualites');
}

export default async function ActualitesPage() {
  const actualiteService = container.resolve(ActualiteService);
  const actualites = await actualiteService.listActualites();
  
  return <ActualitesView actualites={actualites} archiverActualite={archiverActualite} />;
}