import * as moxios from 'moxios';
import * as sinon from 'sinon';

import { MoviesService } from '../movies.service';
import { moviesMock } from '../../__mocks__/movies.mock';
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

    it('should call for cast list', () => {
        moxios.withMock(async () => {
            sandbox.stub(axiosInstance, 'get').returns({ data: [...castFromApiMock] });
            const returnedMovieWithCast = await moviesService.getCast(moviesMock[0]);

            expect(returnedMovieWithCast).toEqual(moviesMock[0]);
        });
    });
});
