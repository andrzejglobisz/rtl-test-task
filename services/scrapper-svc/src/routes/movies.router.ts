import * as Router from 'koa-router';
import { MoviesService } from '../services/movies.service';
import { MoviesRouteHandlers } from './route-handlers';
import { DatabaseService } from '../services/database.service';

export class MoviesRouter {
    private moviesRouteHandlers: MoviesRouteHandlers;
    constructor() {
        this.moviesRouteHandlers = new MoviesRouteHandlers(new MoviesService(), new DatabaseService());
    }

    public getRouter() {
        const router = new Router();
        router.get('/shows', this.moviesRouteHandlers.getMovies);
        router.get('/showsNo', this.moviesRouteHandlers.getMoviesNo);
        router.all('*', this.moviesRouteHandlers.errorHandler);

        return router;
    }
}
