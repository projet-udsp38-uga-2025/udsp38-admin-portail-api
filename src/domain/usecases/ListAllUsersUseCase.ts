import { inject, injectable } from "tsyringe";
import { UserEntity } from "../entities/UserEntity";
import type { UserRepository } from "../repositories/UserRepository";

@injectable()
export class ListAllUsersUseCase {
    constructor(
        @inject('IUserRepository') private readonly userRepository: UserRepository
    ) {} 
    async execute(): Promise<UserEntity[]> {
        return this.userRepository.findAllUsers();
    }
}