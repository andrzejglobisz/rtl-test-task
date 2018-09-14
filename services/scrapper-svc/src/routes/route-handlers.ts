import { Context } from 'koa';

import { MoviesService } from '../services/movies.service';
import { DatabaseService } from '../services/database.service';
import { AnyFunction } from '../types/types';
import limiter from '../utils/limiter.util';

export class MoviesRouteHandlers {
    private moviesService: MoviesService;
    private dbService: DatabaseService;
    private scrappingInProgress: boolean;

    constructor(
        moviesService: MoviesService = new MoviesService(),
        dbService: DatabaseService = new DatabaseService()
    ) {
        this.moviesService = moviesService;
        this.dbService = dbService;
        this.scrappingInProgress = false;
    }

    public getMovies = async (ctx: Context): Promise<void> => {
        if (this.scrappingInProgress) ctx.throw('Scrapper is already scrapping movies');

        try {
            this.scrappingInProgress = true;
            const startingPage = await this.dbService.getCurrentPageToScrap();
            const movies = await this.moviesService.getMovies(startingPage);

            if (!movies.length) {
                ctx.throw(ctx.status, "Can't find any movies");
            }

            const moviesWithCastPromise = movies.map(async movie => {
                const movieToDb = await limiter.schedule(async () => this.moviesService.getCast(movie));
                await this.dbService.saveMovie(movieToDb);

                return movieToDb;
            });

            ctx.body = {
                data: { startingPage, moviesDownloaded: moviesWithCastPromise.length },
            };
        } catch (error) {
            ctx.throw(ctx.status, error);
            this.scrappingInProgress = false;
        }
    };

    public getMoviesNo = async (ctx: Context): Promise<void> => {
        try {
            const highestId = await this.dbService.getHighestId();
            const movieNo = await this.dbService.getNumberOfMovies();

            ctx.body = {
                data: { highestId, movieNo },
            };
        } catch (error) {
            ctx.throw(ctx.status, error);
        }
    };

    public errorHandler = async (ctx: Context, next: AnyFunction): Promise<void> => {
        ctx.throw(ctx.status, ctx.message, 'Error');
    };
}
