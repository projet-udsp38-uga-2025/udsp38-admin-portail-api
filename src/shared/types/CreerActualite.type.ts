import { TagCreatableOption } from "./TagCreatableOption.type";

export type CreerActualite = {
    titre: string;
    description?: string;
    imageUrl?: string;
    categorie?: number | string;
    tags?: TagCreatableOption[];

    modePublication?: "BROUILLON" | "IMMEDIATE" | "PROGRAMMEE";
    datePublicationSouhaitee?: string; 
};