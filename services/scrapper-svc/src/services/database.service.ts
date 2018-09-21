import * as nconf from 'nconf';

import { Movie } from '../types/types';

import MovieModel from '../models/Movie';
import { AppConfig } from '../types/config';

export class DatabaseService {
    public saveMovie = async (movie: Movie) => {
        (await this.isMovieInDB(movie.id)) ? this.updateInDB(movie) : this.saveToDb(movie);
    };

    public isMovieInDB = async (id: number) => {
        const movieInDb = await MovieModel.findOne({ id }).exec();

        return !!movieInDb;
    };

    public updateInDB = (movie: Movie): void => {
        MovieModel.update({ id: movie.id }, { ...movie });
    };

    public saveToDb = async (movie: Movie): Promise<void> => {
        const { id, name, cast } = movie;
        const movieToDb = new MovieModel({ id, name, cast });

        await movieToDb.save();
    };

    public getNumberOfMovies = async (): Promise<number> => {
        const movieIds = await MovieModel.find({}, 'id').exec();

        return movieIds.length;
    };

    public getHighestId = async (): Promise<number> => {
        const lastMovie = await MovieModel.findOne()
            .sort({ _id: -1 })
            .exec();

        return lastMovie ? lastMovie.id : 0;
    };

    public getCurrentPageToScrap = async (): Promise<number> => {
        const highestId = await this.getHighestId();

        return !!highestId ? Math.floor(highestId / nconf.get(AppConfig.MOVIES_PER_PAGE)) : 0;
    };
}
