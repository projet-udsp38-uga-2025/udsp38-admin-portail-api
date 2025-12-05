export type ActualiteComplete = {
    publication: {
        tagsDePublications: ({
            tag: {
                id: number;
                libelle: string;
            };
        } & {
            id_publication: number;
            id_tag: number;
        })[];
    } & {
        id: number;
        date_creation: Date;
        date_modification: Date | null;
        date_publication: Date | null;
        date_expiration: Date | null;
        statut: string | null;
        titre: string;
        description: string | null;
        image_url: string | null;
        id_categorie: number | null;
    };
} & {
    id: number;
    id_publication: number;
}