import * as http from 'http';

import mongoConnector from './mongo.connector';

import configureLoggers from './utils/logger-config';

export async function bootstrap(): Promise<http.Server> {
    configureLoggers();

    await mongoConnector();

    return http.createServer();
}
