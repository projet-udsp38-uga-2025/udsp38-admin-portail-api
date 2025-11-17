import "reflect-metadata";
import { container } from "tsyringe";
import { TOKENS } from "./tokens";

import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";
import { CategoriePrismaRepository } from "@/infrastructure/database/prisma/repositories/CategoriePrismaRepository";
import { ActualitePrismaRepository } from '../database/prisma/repositories/ActualitePrismaRepository';
import { TagPrismaRepository } from "../database/prisma/repositories/TagPrismaRepository";

container.register<CategorieRepository>(TOKENS.ICategorieRepository, {
  useClass: CategoriePrismaRepository,
});

container.register(TOKENS.IActualiteRepository, {
  useClass: ActualitePrismaRepository,
});

container.register(TOKENS.ITagRepository, {
  useClass: TagPrismaRepository,
});