import { Optional } from "@/shared/types/Optional.type";

export type UserListDTO = {
    id: number;
    email: string; 
    name: Optional<string>;
}