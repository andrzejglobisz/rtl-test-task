import { getLogger } from 'log4js';

import { MoviesService } from '../services/movies.service';
import { DatabaseService } from '../services/database.service';

const logger = getLogger();

export class ScrapperService {
    private moviesService: MoviesService;
    private dbService: DatabaseService;
    private scrappingInProgress: boolean;

    constructor(
        moviesService: MoviesService = new MoviesService(),
        dbService: DatabaseService = new DatabaseService()
    ) {
        this.moviesService = moviesService;
        this.dbService = dbService;
        this.scrappingInProgress = false;
    }

    public getMovies = async (): Promise<void> => {
        if (this.scrappingInProgress) throw Error('Scrapper is already scrapping movies');

        try {
            this.scrappingInProgress = true;
            const startingPage = await this.dbService.getCurrentPageToScrap();
            await this.moviesService.getMovies(startingPage);
        } catch (error) {
            this.scrappingInProgress = false;
            logger.error(`${error.response.status}: ${error.response.statusText}`);
        }
    };
}
