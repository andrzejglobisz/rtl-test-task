import { getLogger } from 'log4js';

import { bootstrap } from './app';
import config, { AppConfig } from './config.loader';

const defaultLogger = getLogger();

bootstrap()
    .then(app => {
        app.listen(
            config.get(AppConfig.LISTENING_PORT),
            async (): Promise<void> =>
                defaultLogger.info(`Server is listening on port ${config.get(AppConfig.LISTENING_PORT)}`)
        );
    })
    .catch((err: Error) => {
        defaultLogger.error(err.message);
        defaultLogger.error('Shutting down Node process ...');

        process.exit(1);
    });
