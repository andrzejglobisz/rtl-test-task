import * as nconf from 'nconf';
import { AxiosResponse } from 'axios';
import { getLogger } from 'log4js';
import { Cast, CastFromApi, MovieFromApi, Movie } from '../types/types';

import axiosInstance from '../utils/axios-instance.util';
import { asyncForEach } from '../utils/async.foreach';
import { promiseRetryWrapper } from '../utils/promise.retry';
import { DatabaseService } from './database.service';

import { HTTP_STATUS } from '../types/status.codes';
import { AppConfig } from '../types/config';

const logger = getLogger();

export class MoviesService {
    public dbService: DatabaseService;
    public promiseRetryWrapper = promiseRetryWrapper;

    constructor(dbService: DatabaseService = new DatabaseService()) {
        this.dbService = dbService;
    }

    public async getMovies(startingPage: number = 0): Promise<void> {
        let pageNo = startingPage;
        while (true) {
            const moviesOnPage = await this.getMoviesFromPage(pageNo);
            const movies = [...this.mapMovies(moviesOnPage)];
            logger.info(`Number of movies from page ${pageNo} - ${moviesOnPage.length}`);
            await asyncForEach(movies, async movie => {
                await this.promiseRetryWrapper(async () => this.getAndSaveCast(movie));
            });
            pageNo += 1;
        }
    }

    public async getAndSaveCast(movie: Movie) {
        const movieWithCast = await this.getCast(movie);
        await this.dbService.saveMovie(movieWithCast);
        logger.info(`Movie ${movieWithCast.name} saved to database`);

        return movieWithCast;
    }

    public async getMoviesFromPage(pageNo: number): Promise<MovieFromApi[]> {
        const scrapperUrl = `${nconf.get(AppConfig.TVMAZE_URI)}${nconf.get(AppConfig.TVMAZE_SHOWS_QUERY)}${pageNo}`;
        logger.info(`Getting movies from page no: ${pageNo} (${scrapperUrl})`);
        try {
            const moviesOnPage = await promiseRetryWrapper(() => axiosInstance.get(scrapperUrl));

            return moviesOnPage.data;
        } catch (error) {
            if (error.response.status === HTTP_STATUS.NOT_FOUND) {
                logger.info(`Last page with movies: ${pageNo - 1}`);
            }
            throw error;
        }
    }

    public async getCast(movie: Movie): Promise<Movie> {
        logger.info(`Getting cast for ${movie.name} (id: ${movie.id})`);
        const scrapperUrl = `${nconf.get(AppConfig.TVMAZE_URI)}/${movie.id}${nconf.get(AppConfig.TVMAZE_CAST_PATH)}`;
        const cast: AxiosResponse<CastFromApi[]> = await axiosInstance.get(scrapperUrl);
        const sortedCast = cast.data.length ? this.sortCast(this.mapCast(cast.data)) : [];

        return {
            ...movie,
            cast: sortedCast,
        };
    }

    public mapMovies(movies: MovieFromApi[]): Movie[] {
        return movies.map(movie => ({
            id: movie.id,
            name: movie.name,
            cast: [],
        }));
    }

    public sortCast(cast: Cast[]): Cast[] {
        return cast.sort(
            (a, b) => (a.birthday ? (b.birthday ? Date.parse(a.birthday) - Date.parse(b.birthday) : -1) : 1)
        );
    }

    public mapCast(cast: CastFromApi[]): Cast[] {
        return cast.map(actor => ({
            id: actor.person.id,
            name: actor.person.name,
            birthday: actor.person.birthday,
        }));
    }
}
