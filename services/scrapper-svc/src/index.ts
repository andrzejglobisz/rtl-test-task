import { getLogger } from 'log4js';

import { bootstrap } from './app';
import config, { AppConfig } from './config.loader';

import { ScrapperService } from './services/scrapper.service';

const defaultLogger = getLogger();
const scrapperService = new ScrapperService();

bootstrap()
    .then(app => {
        app.listen(
            config.get(AppConfig.LISTENING_PORT),
            (): void => defaultLogger.info(`Server is listening on port ${config.get(AppConfig.LISTENING_PORT)}`)
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
