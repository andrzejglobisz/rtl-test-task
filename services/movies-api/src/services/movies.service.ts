import { Movie } from '../types/types';

import MovieModel, { MovieModel as MovieModelType } from '../models/Movie';
import config, { AppConfig } from '../config.loader';

export class MoviesService {
    public getMovies = async (pageNo: number): Promise<Movie[]> => {
        const moviesFromDb: MovieModelType[] = await MovieModel.find(
            {},
            { id: 1, _id: 0, name: 1, 'cast.id': 1, 'cast.name': 1, 'cast.birthday': 1 },
            { skip: config.get(AppConfig.MOVIES_PER_PAGE) * pageNo, limit: config.get(AppConfig.MOVIES_PER_PAGE) }
        ).exec();

        return moviesFromDb;
    };
}
