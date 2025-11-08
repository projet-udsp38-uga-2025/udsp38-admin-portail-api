import { Optional } from "@/shared/types/Optional.type";

export class UserEntity {
    id: number;
    name: Optional<string>;
    email: string;

    constructor(id: number, email: string, name: Optional<string>) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}