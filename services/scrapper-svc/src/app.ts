import * as Koa from 'koa';
import * as bodyParser from 'koa-body';

import mongoConnector from './mongo.connector';
import configureLoggers from './utils/logger-config';

export async function bootstrap(): Promise<Koa> {
    configureLoggers();

    await mongoConnector();

    const app: Koa = new Koa();

    app.use(bodyParser());

    return app;
}
