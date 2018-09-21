import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-body';
import config, { AppConfig } from './config.loader';

import mongoConnector from './mongo.connector';
import { MoviesRouter } from './routes/movies.router';

import configureLoggers from './utils/logger-config';
import { errorHandlerMiddleware, errorEmitter } from './middlewares/error-handler.middleware';

export async function bootstrap(): Promise<Koa> {
    config.load();
    configureLoggers();
    
    await mongoConnector();

    const app: Koa = new Koa();

    app.use(errorHandlerMiddleware);
    app.on('error', errorEmitter);

    app.use(bodyParser());

    const router = new Router();
    MoviesRouter.init(router);

    app.use(router.routes());

    return app;
}
