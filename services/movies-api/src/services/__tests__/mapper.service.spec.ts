import { mapToMovie } from '../mapper.service';
import { moviesFromDbMock, moviesMock } from '../../__mocks__/movies.mock';

describe('Mapper service ', () => {
    it('map to Movies and Cast interface', () => {
        expect(mapToMovie(moviesFromDbMock)).toEqual(moviesMock);
    });
});
