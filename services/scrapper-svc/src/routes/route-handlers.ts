import { Context } from 'koa';

import { DatabaseService } from '../services/database.service';
import { AnyFunction } from '../types/types';

export class MoviesRouteHandlers {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService = new DatabaseService()) {
        this.dbService = dbService;
    }

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
