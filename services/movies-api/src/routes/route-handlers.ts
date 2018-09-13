import { Context } from 'koa';
import { getLogger } from 'log4js';

import { MoviesService } from '../services/movies.service';
import { AnyFunction } from '../types/types';

const logger = getLogger();

export class MoviesRouteHandlers {
    private moviesService: MoviesService;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
    }

    public getMovies = async (ctx: Context, next: AnyFunction): Promise<void> => {
        try {
            logger.info('Getting movies from database');
            const movies = await this.moviesService.getMovies();
            logger.info(`Got ${movies.length} movies`);

            ctx.body = {
                status: 200,
                data: movies,
            };
        } catch (error) {
            ctx.throw(ctx.status, 'Problems with accessing the database');
        }
    };

    public errorHandler = async (ctx: Context, next: AnyFunction): Promise<void> => {
        ctx.throw(ctx.status, ctx.message, 'Error');
    };
}
