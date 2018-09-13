export interface Movie {
    name: string;
    cast: Cast[];
    id: number;
}

export interface Cast {
    id: number;
    name: string;
    birthday: string;
}

export interface MovieFromApi {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string | null;
    schedule: {};
    rating: {};
    weight: number;
    network: {};
    webChannel: {} | null;
    externals: {};
    image: {};
    summary: string;
    updated: number;
    _links: {};
}

export interface CastFromApi {
    person: {
        id: number;
        url: string;
        name: string;
        country: {};
        birthday: string | null;
        deathday: string | null;
        gender: string;
        image: {};
        _links: {};
    };
    character: {
        id: number;
        url: string;
        name: string;
        image: {};
        _links: {};
    };
    self: boolean;
    voice: boolean;
}

export type AnyFunction = () => void;
export type AsyncFunction = () => Promise<void>;
