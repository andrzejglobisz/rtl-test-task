import * as Router from 'koa-router';
import { MoviesService } from '../services/movies.service';
import { MoviesRouteHandlers } from './route-handlers';

export class MoviesRouter {

    public static init(router: Router, path: string = '/shows') {
        const moviesRouteHandlers = new MoviesRouteHandlers(new MoviesService())

        router.get(path, moviesRouteHandlers.getMovies);
        router.all('*', moviesRouteHandlers.errorHandler);
    }
}
