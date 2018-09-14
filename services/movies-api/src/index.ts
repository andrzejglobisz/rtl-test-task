import { getLogger } from 'log4js';

import { bootstrap } from './app';
import CONFIG from './config';

const defaultLogger = getLogger();

bootstrap()
    .then(app => {
        app.listen(
            CONFIG.LISTENING_PORT,
            async (err?: Error): Promise<void> => {
                if (err) {
                    defaultLogger.error(err.message);
                }

                defaultLogger.info(`Server is listening on port ${CONFIG.LISTENING_PORT}`);
            }
        );
    })
    .catch((err: Error) => {
        defaultLogger.error(err.message);
        defaultLogger.error('Shutting down Node process ...');

        process.exit(1);
    });
