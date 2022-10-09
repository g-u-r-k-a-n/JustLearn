import { Movie } from "./movie";

export class Person extends Movie {
    constructor() {
        super();
    }
    public override readonly id: number;
    public readonly gender: number;
    public readonly name: string;
    public readonly also_known_as: string[];
    public readonly original_name: string;
    public readonly profile_path: string;
    public readonly character: string;
    public readonly order: number;
    public readonly biography?: string;
    public override readonly homepage?: string;
    public readonly place_of_birth?: string;
    public birthday?: Date;
    public readonly deathday?: Date;
    public override readonly popularity?: number;
    public override readonly imdb_id?: string;

    public get age(): number {
        return new Date().getFullYear() - new Date(this.birthday)?.getFullYear();
    }
}