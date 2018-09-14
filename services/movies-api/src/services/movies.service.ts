import { Movie } from '../types/types';

import MovieModel, { MovieModel as MovieModelType } from '../models/Movie';
import { mapToMovie } from './mapper.service';

export class MoviesService {
    public getMovies = async (): Promise<Movie[]> => {
        const moviesFromDb: MovieModelType[] = await MovieModel.find({}).exec();

        return mapToMovie(moviesFromDb);
    };
}
