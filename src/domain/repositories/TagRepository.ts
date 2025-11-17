import { TagEntity } from "../entities/TagEntity";

export interface TagRepository {
    create(tag: TagEntity): Promise<TagEntity>;
    createMany(tags: TagEntity[]): Promise<TagEntity[]>
    search(value: string): Promise<TagEntity[]>;
}