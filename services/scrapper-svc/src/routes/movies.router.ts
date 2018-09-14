import * as Router from 'koa-router';
import { MoviesRouteHandlers } from './route-handlers';

export class MoviesRouter {
    private moviesRouteHandlers: MoviesRouteHandlers;
    constructor() {
        this.moviesRouteHandlers = new MoviesRouteHandlers();
    }

    public getRouter() {
        const router = new Router();
        router.get('/showsNo', this.moviesRouteHandlers.getMoviesNo); // just for checking DB status
        router.all('*', this.moviesRouteHandlers.errorHandler);

        return router;
    }
}
