import { getLogger } from 'log4js';
import * as nconf from 'nconf';

import { bootstrap } from './app';
import { AppConfig } from './types/config';

const defaultLogger = getLogger();

bootstrap()
    .then(app => {
        app.listen(
            nconf.get(AppConfig.LISTENING_PORT),
            async (): Promise<void> =>
                defaultLogger.info(`Server is listening on port ${nconf.get(AppConfig.LISTENING_PORT)}`)
        );
    })
    .catch((err: Error) => {
        defaultLogger.error(err.message);
        defaultLogger.error('Shutting down Node process ...');

        process.exit(1);
    });
