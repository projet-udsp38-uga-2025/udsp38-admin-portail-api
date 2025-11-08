import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
    findAllUsers(): Promise<UserEntity[]>;
}