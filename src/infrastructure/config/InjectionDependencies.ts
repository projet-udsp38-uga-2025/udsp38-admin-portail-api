import "reflect-metadata";
import { container } from "tsyringe";
import { TOKENS } from "./tokens";

import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";
import { CategoriePrismaRepository } from "@/infrastructure/database/prisma/repositories/CategoriePrismaRepository";
import { ActualitePrismaRepository } from '../database/prisma/repositories/ActualitePrismaRepository';

container.register<CategorieRepository>(TOKENS.ICategorieRepository, {
  useClass: CategoriePrismaRepository,
});

container.register('IActualiteRepository', {
  useClass: ActualitePrismaRepository,
});