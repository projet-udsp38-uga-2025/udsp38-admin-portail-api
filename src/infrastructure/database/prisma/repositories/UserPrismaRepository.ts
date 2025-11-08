import { UserEntity } from "@/domain/entities/UserEntity";
import { UserRepository } from "@/domain/repositories/UserRepository";
import prisma from "../lib/prisma";
import { injectable } from "tsyringe";

@injectable()
export class UserPrismaRepository implements UserRepository {
    async findAllUsers(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany();
        return users.map(user => new UserEntity(user.id, user.email, user.name));
    }
}   