'use server';
import "reflect-metadata";
import "@/infrastructure/config/InjectionDependencies";
import { container } from "tsyringe";
import { ActualiteService } from "../../application/services/ActualiteService";
import { revalidatePath } from "next/cache";
import { ActualiteListDTO } from "../../application/dtos/ActualiteListDTO";
import { CreerActualite } from "@/shared/types/CreerActualite.type";
import { ActualiteDTO } from "@/application/dtos/ActualiteDTO";
import { join } from "path";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export async function listActualitesAction(): Promise<ActualiteListDTO[]> {
  const actualiteService = container.resolve(ActualiteService);
    return await actualiteService.listActualites();
}

export async function archiverActualiteAction(id: number): Promise<void> {
    const actualiteService = container.resolve(ActualiteService);
    await actualiteService.archiver(id);
    revalidatePath('/actualites');
}

export async function creerActualiteAction(data: CreerActualite): Promise<ActualiteDTO> {
  try { 
    const actualiteService = container.resolve(ActualiteService);
    revalidatePath('/actualites');
    return await actualiteService.creerActualite(data);
  } catch {
    throw new Error();
  }
}

export async function enregistrerImage(file: File): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const date = new Date().toISOString().split("T")[0];
    const nomSansEspace = file.name.replace(/\s+/g, "");
    const filename = `${date}_${randomUUID()}_${nomSansEspace}`;
    const filePath = join(`${process.env.NEXT_UPLOAD_IMAGE_DIR}`, filename);

    await writeFile(filePath, buffer);
    return filename;
  } catch {
    throw new Error();
  }
}
