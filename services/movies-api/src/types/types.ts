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

export type AnyFunction = () => void;
export type AsyncFunction = () => Promise<void>;
