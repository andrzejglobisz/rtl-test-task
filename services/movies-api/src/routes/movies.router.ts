import * as Router from 'koa-router';
import { MoviesService } from '../services/movies.service';
import { MoviesRouteHandlers } from './route-handlers';

export class MoviesRouter {
    private moviesRouteHandlers: MoviesRouteHandlers;
    constructor() {
        this.moviesRouteHandlers = new MoviesRouteHandlers(new MoviesService());
    }

    public getRouter() {
        const router = new Router();
        router.get('/shows', this.moviesRouteHandlers.getMovies);
        router.all('*', this.moviesRouteHandlers.errorHandler);

        return router;
    }
}
