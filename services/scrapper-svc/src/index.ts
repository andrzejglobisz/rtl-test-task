import { getLogger } from 'log4js';

import { bootstrap } from './app';
import CONFIG from './config';
import { ScrapperService } from './services/scrapper.service';

const defaultLogger = getLogger();
const scrapperService = new ScrapperService();

bootstrap()
    .then(app => {
        app.listen(
            CONFIG.LISTENING_PORT,
            (): void => defaultLogger.info(`Server is listening on port ${CONFIG.LISTENING_PORT}`)
        );
        scrapperService
            .getMovies()
            .then(() => {
                defaultLogger.info('Scrapping finished');
            })
            .catch(error => {
                defaultLogger.error(`Error while scrapping: ${error}`);
            });
    })
    .catch((err: Error) => {
        defaultLogger.error(err.message);
        defaultLogger.error('Shutting down Node process ...');

        process.exit(1);
    });
