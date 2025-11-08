import { UserEntity } from "@/domain/entities/UserEntity";
import { UserListDTO } from "../dtos/UserListDTO";

export class UserMapper {
  static toUserListDTO(user: UserEntity): UserListDTO  {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}