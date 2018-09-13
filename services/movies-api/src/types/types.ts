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

export interface CastInDb extends Cast {
    _id: string;
}

export interface MovieInDb extends Movie {
    _id: string;
    __v: number;
    cast: CastInDb[];
}

export type AnyFunction = () => void;
export type AsyncFunction = () => Promise<void>;
