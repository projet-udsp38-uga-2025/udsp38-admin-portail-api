import 'reflect-metadata';
import { container } from "tsyringe";
import { ListAllUsersUseCase } from '@/domain/usecases/ListAllUsersUseCase';
import { UserMapper } from '../mappers/UserMapper';


export class UsersService {
    constructor() {}
    async listUsers() {
        const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
        const users = await listAllUsersUseCase.execute();
        return users.map(user => UserMapper.toUserListDTO(user));
    }
}