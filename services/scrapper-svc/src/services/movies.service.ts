import { AxiosResponse } from 'axios';
import { getLogger } from 'log4js';
import { Cast, CastFromApi, MovieFromApi, Movie } from '../types/types';

import axiosInstance from '../utils/axios-instance.util';

import CONFIG from '../config';
import limiter from '../utils/limiter.util';

const logger = getLogger();

export class MoviesService {
    public async getMovies(startingPage: number = 0): Promise<Movie[]> {
        let pageNo = startingPage;
        let movies: Movie[] = [];
        while (pageNo < CONFIG.LAST_PAGE) {
            try {
                const moviesOnPage = await this.getMoviesFromPage(pageNo);
                movies = [...movies, ...this.mapMovies(moviesOnPage)];
                logger.info(`Number of movies from page ${pageNo} - ${moviesOnPage.length}`);
                pageNo += 1;
            } catch {
                logger.info(`Last page with movies: ${pageNo - 1}`);

                return movies;
            }
        }

        return movies;
    }

    public async getMoviesFromPage(pageNo: number): Promise<MovieFromApi[]> {
        const scrapperUrl = `${CONFIG.TVMAZE_URI}/shows?page=${pageNo}`;
        logger.info(`Getting movies from page no: ${pageNo} (${scrapperUrl})`);
        const moviesResponse: AxiosResponse<MovieFromApi[]> = await limiter.schedule(
            async () => await axiosInstance.get(scrapperUrl)
        );

        return moviesResponse.data;
    }

    public async getCast(movie: Movie): Promise<Movie> {
        logger.info(`Getting cast for ${movie.name} (id: ${movie.id})`);
        const scrapperUrl = `${CONFIG.TVMAZE_URI}/shows/${movie.id}/cast`;
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
        return cast.sort((a, b) => b.birthday.localeCompare(a.birthday));
    }

    public mapCast(cast: CastFromApi[]): Cast[] {
        return cast.map(actor => ({
            id: actor.person.id,
            name: actor.person.name,
            birthday: actor.person.birthday ? actor.person.birthday : '',
        }));
    }
}
