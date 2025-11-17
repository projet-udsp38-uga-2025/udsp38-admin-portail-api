import { Optional } from "@/shared/types/Optional.type";

export class TagEntity {
    id: Optional<number>;
    libelle: string;

    constructor(props: {id?: number, libelle?: string}) {
        this.id = props.id;
        this.libelle = props.libelle!;
    }
}