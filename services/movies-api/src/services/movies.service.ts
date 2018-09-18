import { Movie } from '../types/types';

import MovieModel, { MovieModel as MovieModelType } from '../models/Movie';
import CONFIG from '../config';

export class MoviesService {
    public getMovies = async (pageNo: number): Promise<Movie[]> => {
        const moviesFromDb: MovieModelType[] = await MovieModel.find(
            {
                id: { $gte: this.calcFirstMovieId(pageNo), $lt: this.calcLastMovieId(pageNo) },
            },
            { id: 1, _id: 0, name: 1, 'cast.id': 1, 'cast.name': 1, 'cast.birthday': 1 }
        ).exec();

        return moviesFromDb;
    };

    private calcFirstMovieId = (pageNo: number) => pageNo * CONFIG.MOVIES_PER_PAGE;

    private calcLastMovieId = (pageNo: number) => (pageNo + 1) * CONFIG.MOVIES_PER_PAGE;
}
