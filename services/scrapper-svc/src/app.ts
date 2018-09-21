import * as http from 'http';
import * as nconf from 'nconf';
import * as path from 'path';

import mongoConnector from './mongo.connector';
import configureLoggers from './utils/logger-config';

export async function bootstrap(): Promise<http.Server> {
    nconf.env().argv();
    const environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(path.join(__dirname, `config/config.${environment.toLowerCase()}.json`));
    
    configureLoggers();

    await mongoConnector();

    return http.createServer();
}
