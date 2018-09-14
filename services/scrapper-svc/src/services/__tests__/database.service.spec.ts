import { createSandbox } from 'sinon';

import MovieModel from '../../models/Movie';

import { moviesMock } from '../../__mocks__/movies.mock';
import { DatabaseService } from '../database.service';

const sandbox = createSandbox();

describe('Database service', () => {
    const databaseService = new DatabaseService();

    afterEach(() => {
        sandbox.restore();
    });

    it('should update to database', async () => {
        MovieModel.update = jest.fn();

        databaseService.updateInDB(moviesMock[0]);
        expect(MovieModel.update).toHaveBeenCalled();
    });

    it('should choose to save movie to database', async () => {
        sandbox.stub(MovieModel, 'findOne').returns({ exec: () => null });
        databaseService.saveToDb = jest.fn();

        await databaseService.saveMovie(moviesMock[0]);
        expect(databaseService.saveToDb).toHaveBeenCalledWith(moviesMock[0]);
    });

    it('should choose to update movie in database', async () => {
        sandbox.stub(MovieModel, 'findOne').returns({ exec: () => moviesMock[0] });
        databaseService.updateInDB = jest.fn();

        await databaseService.saveMovie(moviesMock[0]);
        expect(databaseService.updateInDB).toHaveBeenCalledWith(moviesMock[0]);
    });

    it('should get number of page to start scrapping', async () => {
        sandbox.stub(MovieModel, 'find').returns({ exec: () => moviesMock.map(movie => ({ id: movie.id })) });

        const pageToScrap = await databaseService.getCurrentPageToScrap();
        expect(pageToScrap).toEqual(0);
    });
});
