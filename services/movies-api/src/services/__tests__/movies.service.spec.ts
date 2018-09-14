import { createSandbox } from 'sinon';

import MovieModel from '../../models/Movie';

import { MoviesService } from '../movies.service';
import { moviesMock, moviesFromDbMock } from '../../__mocks__/movies.mock';

const sandbox = createSandbox();

describe('Movies service', () => {
    const moviesService = new MoviesService();
    sandbox.stub(MovieModel, 'find').returns({ exec: () => moviesFromDbMock });

    it('should call for movies list', async () => {
        const returndedMovies = await moviesService.getMovies();
        expect(returndedMovies).toEqual(moviesMock);
    });
});
