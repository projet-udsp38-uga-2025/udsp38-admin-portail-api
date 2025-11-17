import { TagRepository } from "@/domain/repositories/TagRepository";
import prisma from "../lib/prisma";
import { TagEntity } from "@/domain/entities/TagEntity";

export class TagPrismaRepository implements TagRepository {
    async create(tag: TagEntity): Promise<TagEntity> {
        const createdTag = await prisma.tag.create({
            data: {
                libelle: tag.libelle!,
            },
        });

        return new TagEntity({ id: createdTag.id, libelle: createdTag.libelle });
    }

    async search(value: string): Promise<TagEntity[]> {
        const tags = await prisma.tag.findMany({
            where: {
                libelle: {
                    contains: value,
                    mode: "insensitive"
                },
            },
            take: 5
        });

        return tags.map(tag => new TagEntity({ id: tag.id, libelle: tag.libelle }));
    }

    async createMany(tags: TagEntity[]): Promise<TagEntity[]> {
        const tagsCrees = await prisma.tag.createManyAndReturn({
            data: tags.map(tag => ({ libelle: tag.libelle! })),
        });

        return tagsCrees.map(tag => new TagEntity({ id: tag.id, libelle: tag.libelle }));
    }
}