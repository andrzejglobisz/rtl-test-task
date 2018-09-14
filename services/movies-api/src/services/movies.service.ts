import { Movie } from '../types/types';

import MovieModel, { MovieModel as MovieModelType } from '../models/Movie';
import { mapToMovie } from './mapper.service';
import axiosInstance from '../utils/axios-instance.util';
import CONFIG from '../config';

export class MoviesService {
    public getMovies = async (): Promise<Movie[]> => {
        const moviesFromDb: MovieModelType[] = await MovieModel.find({}).exec();

        return mapToMovie(moviesFromDb);
    };

    public triggerScrapper = async (): Promise<void> => {
        const scrapperUrl = `${CONFIG.SCRAPPER_URI}/shows`;
        await axiosInstance.get(scrapperUrl);
    };
}
