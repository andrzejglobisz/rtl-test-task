import * as http from 'http';
import config from './config.loader';

import mongoConnector from './mongo.connector';

import configureLoggers from './utils/logger-config';

export async function bootstrap(): Promise<http.Server> {
    config.load();
    configureLoggers();

    await mongoConnector();

    return http.createServer();
}
