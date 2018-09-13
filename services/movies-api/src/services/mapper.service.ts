import { Movie, Cast } from '../types/types';
import { MovieModel, CastModel } from '../models/Movie';

export function mapToMovie(movies: MovieModel[]): Movie[] {
    return movies.map(
        (movie: MovieModel): Movie => {
            const { id, name, cast } = movie;

            return {
                id,
                name,
                cast: mapToCast(cast as CastModel[]),
            };
        }
    );
}

function mapToCast(cast: CastModel[]): Cast[] {
    return cast.map(
        (actor: CastModel): Cast => {
            const { id, name, birthday } = actor;

            return {
                id,
                name,
                birthday,
            };
        }
    );
}
