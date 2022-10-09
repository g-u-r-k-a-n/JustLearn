import { Genre } from "./genre";
import { Review } from "./review";

export class Movie {
    public readonly isAdult: boolean;
    public readonly backdrop_path: string;
    public readonly genre_ids: number[];
    public readonly id: number;
    public readonly original_language: string;
    public readonly original_title: string;
    public readonly overview: string;
    public readonly popularity?: number;
    public readonly poster_path: string;
    public readonly release_date: Date;
    public readonly title: string;
    public readonly video: boolean;
    public readonly vote_average: number;
    public readonly vote_count: number;
    public readonly production_companies: ProductionCompany[];
    public readonly production_countries: ProductionCountry[];
    public readonly spoken_languages: SpokenLanguage[]
    public genres?: Genre[];
    public reviews?: Review[];
    public reviewsCount?: number;
    public readonly budget?: number;
    public readonly revenue?: number;
    public readonly runtime?: number;
    public readonly status?: string;
    public readonly tagline?: string;
    public readonly homepage?: string;
    public readonly imdb_id?: string;


}

class ProductionCompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
}

class ProductionCountry {
    iso_3166_1: string;
    name: string;
}

class SpokenLanguage {
    iso_639_1: string;
    english_name: string;
    name: string;
}