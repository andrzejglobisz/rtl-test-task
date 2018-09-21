import { Context } from 'koa';
import { getLogger } from 'log4js';

import { MoviesService } from '../services/movies.service';
import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../middlewares/error-handler.middleware';

const logger = getLogger();

export class MoviesRouteHandlers {
    private moviesService: MoviesService;

    constructor(moviesService: MoviesService) {
        this.moviesService = moviesService;
    }

    public getMovies = async (ctx: Context, next: AnyFunction): Promise<void> => {
        try {
            const { page } = ctx.query;
            if (isNaN(page)) {
                ctx.status = HTTP_STATUS.BAD_REQUEST;
                ctx.throw();
            }
            logger.info(`Getting movies from database - page ${page}`);
            const movies = await this.moviesService.getMovies(page);
            logger.info(`Got ${movies.length} movies`);

            ctx.body = {
                status: HTTP_STATUS.OK,
                data: movies,
            };
        } catch {
            if (ctx.status === HTTP_STATUS.BAD_REQUEST) {
                ctx.throw(ctx.status, 'Page number is not valid');
            } else {
                ctx.throw(ctx.status, 'Problems with accessing the database');
            }
        }
    };

    public errorHandler = async (ctx: Context, next: AnyFunction): Promise<void> => {
        ctx.throw(ctx.status, ctx.message, 'Error');
    };
}
