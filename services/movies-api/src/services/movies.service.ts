import { Movie } from '../types/types';

import MovieModel from '../models/Movie';

export class MoviesService {
    public getMovies = async (): Promise<Movie[]> => {
        const movies: Movie[] = await MovieModel.find({}).exec();

        return movies;
    };
}
