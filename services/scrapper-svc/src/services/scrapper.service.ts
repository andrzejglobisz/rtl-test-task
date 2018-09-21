import { getLogger } from 'log4js';

import { MoviesService } from '../services/movies.service';

const logger = getLogger();

export class ScrapperService {
    private moviesService: MoviesService;
    private scrappingInProgress: boolean;

    constructor(
        moviesService: MoviesService = new MoviesService()
    ) {
        this.moviesService = moviesService;
        this.scrappingInProgress = false;
    }

    public getMovies = async (): Promise<void> => {
        if (this.scrappingInProgress) throw Error('Scrapper is already scrapping movies');

        try {
            this.scrappingInProgress = true;
            const startingPage = await this.moviesService.dbService.getCurrentPageToScrap();
            await this.moviesService.getMovies(startingPage);
        } catch (error) {
            this.scrappingInProgress = false;
            logger.error(`${error.response.status}: ${error.response.statusText}`);
        }
    };
}
