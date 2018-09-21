import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-body';
import * as nconf from 'nconf';
import * as path from 'path';

import mongoConnector from './mongo.connector';
import { MoviesRouter } from './routes/movies.router';

import configureLoggers from './utils/logger-config';
import { errorHandlerMiddleware, errorEmitter } from './middlewares/error-handler.middleware';

export async function bootstrap(): Promise<Koa> {
    nconf.env().argv();
    const environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(path.join(__dirname, `config/config.${environment.toLowerCase()}.json`));
    configureLoggers();
    
    await mongoConnector();

    const app: Koa = new Koa();

    app.use(errorHandlerMiddleware);
    app.on('error', errorEmitter);

    app.use(bodyParser());

    const router = new Router();
    MoviesRouter.init(router, '/shows');

    app.use(router.routes());

    return app;
}
