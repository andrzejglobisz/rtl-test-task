import * as Koa from 'koa';
import * as bodyParser from 'koa-body';

import mongoConnector from './mongo.connector';
// import { MoviesRouter } from './routes/movies.router';

import configureLoggers from './utils/logger-config';
import { errorHandlerMiddleware, errorEmitter } from './middlewares/error-handler.middleware';

export async function bootstrap(): Promise<Koa> {
    configureLoggers();

    await mongoConnector();

    const app: Koa = new Koa();

    app.use(errorHandlerMiddleware);
    app.on('error', errorEmitter);

    app.use(bodyParser());

    // const moviesRouter = new MoviesRouter().getRouter();
    // app.use(moviesRouter.routes());

    return app;
}
