// tslint:disable no-any
import * as nconf from 'nconf';
import * as path from 'path';

export enum AppConfig {
    LISTENING_PORT = 'LISTENING_PORT',
    MONGODB_URI = 'MONGODB_URI',
    MONGODB_RECONNECT_ATTEMPTS = 'MONGODB_RECONNECT_ATTEMPTS',
    MONGODB_RECONNECT_INTERVAL = 'MONGODB_RECONNECT_INTERVAL',
    SCRAPPER_URI = 'SCRAPPER_URI',
    ENV_MODE = 'ENV_MODE',
    SERVICE_NAME = 'SERVICE_NAME',
    MOVIES_PER_PAGE = 'MOVIES_PER_PAGE',
}

class Config {
    public load = () => {
        nconf.env().argv();
        const environment = nconf.get('NODE_ENV') || 'development';

        nconf.file(path.join(__dirname, `config/config.${environment.toLowerCase()}.json`));
    };

    public get = (key: string) => nconf.get(key);
}

export default new Config();
