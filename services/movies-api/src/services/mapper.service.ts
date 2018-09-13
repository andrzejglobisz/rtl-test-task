import { Movie, Cast, MovieInDb, CastInDb } from '../types/types';
import { CastModel, MovieModel } from '../models/Movie';

type MoviesToMap = MovieInDb | MovieModel;

export function mapToMovie(movies: MoviesToMap[]): Movie[] {
    return movies.map(
        (movie: MoviesToMap): Movie => {
            const { id, name, cast } = movie;

            return {
                id,
                name,
                cast: mapToCast(cast as CastModel[]),
            };
        }
    );
}

function mapToCast(cast: CastInDb[]): Cast[] {
    return cast.map(
        (actor: CastInDb): Cast => {
            const { id, name, birthday } = actor;

            return {
                id,
                name,
                birthday,
            };
        }
    );
}
