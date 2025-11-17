import { Optional } from "@/shared/types/Optional.type";

export type CategorieDTO = {
  id: number;
  nom: string;
  description: Optional<string>;
};
