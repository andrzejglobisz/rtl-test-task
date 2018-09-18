import { AxiosResponse } from 'axios';
import { getLogger } from 'log4js';
import { Cast, CastFromApi, MovieFromApi, Movie } from '../types/types';

import axiosInstance from '../utils/axios-instance.util';

import CONFIG from '../config';
import limiter from '../utils/limiter.util';
import { DatabaseService } from './database.service';

const logger = getLogger();

export class MoviesService {
    private dbService = new DatabaseService();

    public async getMovies(startingPage: number = 0): Promise<void> {
        let pageNo = startingPage;
        while (true) {
            const moviesOnPage = await this.getMoviesFromPage(pageNo);

            if (!moviesOnPage.length) {
                logger.info(`Last page with movies: ${pageNo - 1}`);
                break;
            } else {
                const movies = [...this.mapMovies(moviesOnPage)];
                logger.info(`Number of movies from page ${pageNo} - ${moviesOnPage.length}`);
                movies.forEach(async movie => {
                    const movieWithCast = await limiter.schedule(async () => await this.getCast(movie));
                    await this.dbService.saveMovie(movieWithCast);
                    logger.info(`Movie ${movieWithCast.name} saved to database`);
                });
            }
            pageNo += 1;
        }
    }

    public async getMoviesFromPage(pageNo: number): Promise<MovieFromApi[]> {
        const scrapperUrl = `${CONFIG.TVMAZE_URI}${CONFIG.TVMAZE_SHOWS_QUERY}${pageNo}`;
        logger.info(`Getting movies from page no: ${pageNo} (${scrapperUrl})`);
        let moviesOnPage: MovieFromApi[] = [];
        await limiter.schedule(async () => {
            try {
                moviesOnPage = (await axiosInstance.get(scrapperUrl)).data;
            } catch (error) {
                logger.error(`${error.response.status}: ${error.response.statusText} - can't read from ${scrapperUrl}`);
            }
        });

        return moviesOnPage;
    }

    public async getCast(movie: Movie): Promise<Movie> {
        logger.info(`Getting cast for ${movie.name} (id: ${movie.id})`);
        const scrapperUrl = `${CONFIG.TVMAZE_URI}/${movie.id}${CONFIG.TVMAZE_CAST_PATH}`;
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
