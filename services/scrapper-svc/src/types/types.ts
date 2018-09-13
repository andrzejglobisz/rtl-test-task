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
    genres: [object];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: [object];
    rating: [object];
    weight: number;
    network: [object];
    webChannel: null;
    externals: [object];
    image: [object];
    summary: string;
    updated: number;
    _links: [object];
}

export interface CastFromApi {
    person: {
        id: number;
        url: string;
        name: string;
        country: [object];
        birthday: string;
        deathday: string;
        gender: string;
        image: [object];
        _links: [object];
    };
    character: {
        id: number;
        url: string;
        name: string;
        image: [object];
        _links: [object];
    };
    self: boolean;
    voice: boolean;
}

export type AnyFunction = () => void;
export type AsyncFunction = () => Promise<void>;
