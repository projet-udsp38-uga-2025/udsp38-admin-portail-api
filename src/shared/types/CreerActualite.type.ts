import { CreatableOption } from "./CreatableOption.type";

export type CreerActualite = {
    titre: string;
    description?: string;
    imageUrl?: string;
    categorie?: number | string;
    tags?: CreatableOption[];

    modePublication?: "BROUILLON" | "IMMEDIATE" | "PROGRAMMEE";
    datePublicationSouhaitee?: string; 
};