import type { TagRepository } from "@/domain/repositories/TagRepository";
import type { ActualiteRepository } from "../../repositories/ActualiteRepository";
import { TOKENS } from "@/infrastructure/config/tokens";
import { CreerActualite } from "@/shared/types/CreerActualite.type";
import { inject, injectable } from "tsyringe";
import { TagEntity } from "@/domain/entities/TagEntity";
import { ActualiteEntity } from "@/domain/entities/ActualiteEntity";
import { StatutPublication } from "@/shared/enums/StatutPublication";
import type { CategorieRepository } from "@/domain/repositories/CategorieRepository";

@injectable()
export class CreerActualiteUseCase {
    constructor(
        @inject(TOKENS.IActualiteRepository) private readonly actualiteRepository: ActualiteRepository,
        @inject(TOKENS.ITagRepository) private readonly tagRepository: TagRepository,
        @inject(TOKENS.ICategorieRepository) private readonly categoryRepository: CategorieRepository,
    ) {}

    async execute(data: CreerActualite): Promise<ActualiteEntity> {
        const {tags, categorie,  modePublication, datePublicationSouhaitee, ...actualiteData} = data;
        const tagsExistants = tags?.filter(tag => tag.value !== "new").map(tag => new TagEntity({id: Number(tag.value), libelle: tag.label})) || [];
        const tagACreer = tags?.filter(tag => tag.value === "new").map(tag => new TagEntity({libelle: tag.label })) || [];

        try {
            let idCategorie: number | undefined;
            if (typeof categorie === 'string') {
                const nouvelleCategorie = await this.categoryRepository.create({nom: categorie, description: ""});
                idCategorie = nouvelleCategorie.id;
            } else {
                idCategorie = categorie;
            }
    
            const tagsCrees = await this.tagRepository.createMany(tagACreer);

            let statut: StatutPublication;
            let datePublication: Date | undefined = undefined;
            
            switch(modePublication) {
                case "IMMEDIATE":
                    statut = StatutPublication.PUBLIE;
                    datePublication = new Date();
                    break;
                
                case "PROGRAMMEE":
                    statut = StatutPublication.PROGRAMME; 
                    datePublication = datePublicationSouhaitee
                    ? new Date(datePublicationSouhaitee)
                    : undefined;
                    break;
                
                case "BROUILLON":
                default:
                    statut = StatutPublication.BROUILLON;
                    datePublication = undefined;
                    break;
            }
    
            const actualiteACreer = new ActualiteEntity({
                ...actualiteData,
                idCategorie,
                statut, 
                datePublication
            });

            actualiteACreer.setTags([...tagsExistants, ...tagsCrees]);

            return await this.actualiteRepository.create(actualiteACreer);
        } catch {
            throw new Error();
        }
    }
}