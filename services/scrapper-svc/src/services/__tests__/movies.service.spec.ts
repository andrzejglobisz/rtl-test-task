import * as moxios from 'moxios';
import * as sinon from 'sinon';

import { MoviesService } from '../movies.service';
import { moviesMock, moviesFromApiMock } from '../../__mocks__/movies.mock';
import { castFromApiMock } from '../../__mocks__/cast.mock';

import axiosInstance from '../../utils/axios-instance.util';

const sandbox = sinon.createSandbox();

describe('Movies service', () => {
    const moviesService = new MoviesService();
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
        sandbox.restore();
    });

    it('should call for cast list and save movies', () => {
        moxios.withMock(async () => {
            sandbox.stub(axiosInstance, 'get').returns({ data: [...castFromApiMock] });
            moviesService.dbService.saveMovie = jest.fn();

            const returnedMovieWithCast = await moviesService.getAndSaveCast(moviesMock[0]);

            expect(moviesService.dbService.saveMovie).toHaveBeenCalledWith(returnedMovieWithCast);
            expect(returnedMovieWithCast).toMatchSnapshot();
        });
    });

    it('should call for movies', () => {
        moxios.withMock(async () => {
            sandbox.stub(axiosInstance, 'get').returns({ data: [...moviesFromApiMock] });
            moviesService.promiseRetryWrapper = jest.fn();

            await moviesService.getMovies();

            expect(moviesService.promiseRetryWrapper).toHaveBeenCalledTimes(moviesFromApiMock.length);
        });
    });
});
