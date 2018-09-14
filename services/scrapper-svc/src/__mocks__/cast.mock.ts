import { CastFromApi, Cast } from '../types/types';

export const castMock: Cast[] = [
    { id: 7, name: 'Mackenzie Lintz', birthday: '1996-11-22' },
    { id: 5, name: 'Colin Ford', birthday: '1996-09-12' },
    { id: 11, name: 'Britt Robertson', birthday: '1990-04-18' },
    { id: 8, name: 'Karla Crome', birthday: '1989-06-22' },
    { id: 35903, name: 'Kylie Bunbury', birthday: '1989-01-30' },
    { id: 3, name: 'Alex Koch', birthday: '1988-02-24' },
    { id: 10, name: 'Natalie Martinez', birthday: '1984-07-12' },
    { id: 13, name: 'Jolene Purdy', birthday: '1983-12-09' },
    { id: 1, name: 'Mike Vogel', birthday: '1979-07-17' },
    { id: 2, name: 'Rachelle Lefevre', birthday: '1979-02-01' },
    { id: 4, name: 'Eddie Cahill', birthday: '1978-01-15' },
    { id: 12, name: 'Aisha Hinds', birthday: '1975-11-13' },
    { id: 9, name: 'Dean Norris', birthday: '1963-04-08' },
    { id: 14, name: 'Jeff Fahey', birthday: '1952-11-29' },
    { id: 6, name: 'Nicholas Strong', birthday: '' },
];

export const castFromApiMock: CastFromApi[] = [
    {
        person: {
            id: 1,
            url: 'http://www.tvmaze.com/people/1/mike-vogel',
            name: 'Mike Vogel',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1979-07-17',
            deathday: null,
            gender: 'Male',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/1815.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/1' } },
        },
        character: {
            id: 1,
            url: 'http://www.tvmaze.com/characters/1/under-the-dome-dale-barbie-barbara',
            name: 'Dale "Barbie" Barbara',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/3.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/3.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/1' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 2,
            url: 'http://www.tvmaze.com/people/2/rachelle-lefevre',
            name: 'Rachelle Lefevre',
            country: { name: 'Canada', code: 'CA', timezone: 'America/Halifax' },
            birthday: '1979-02-01',
            deathday: null,
            gender: 'Female',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/82/207417.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/82/207417.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/2' } },
        },
        character: {
            id: 2,
            url: 'http://www.tvmaze.com/characters/2/under-the-dome-julia-shumway',
            name: 'Julia Shumway',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/6.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/6.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/2' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 3,
            url: 'http://www.tvmaze.com/people/3/alex-koch',
            name: 'Alex Koch',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1988-02-24',
            deathday: null,
            gender: 'Male',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/3/7814.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/3/7814.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/3' } },
        },
        character: {
            id: 3,
            url: 'http://www.tvmaze.com/characters/3/under-the-dome-junior-rennie',
            name: 'Junior Rennie',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/10.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/10.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/3' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 5,
            url: 'http://www.tvmaze.com/people/5/colin-ford',
            name: 'Colin Ford',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1996-09-12',
            deathday: null,
            gender: 'Male',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/142/356748.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/142/356748.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/5' } },
        },
        character: {
            id: 5,
            url: 'http://www.tvmaze.com/characters/5/under-the-dome-joe-mcalister',
            name: 'Joe McAlister',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/7.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/7.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/5' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 7,
            url: 'http://www.tvmaze.com/people/7/mackenzie-lintz',
            name: 'Mackenzie Lintz',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1996-11-22',
            deathday: null,
            gender: 'Female',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/3/7816.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/3/7816.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/7' } },
        },
        character: {
            id: 7,
            url: 'http://www.tvmaze.com/characters/7/under-the-dome-norrie-calvert-hill',
            name: 'Norrie Calvert-Hill',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/793.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/793.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/7' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 9,
            url: 'http://www.tvmaze.com/people/9/dean-norris',
            name: 'Dean Norris',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1963-04-08',
            deathday: null,
            gender: 'Male',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/163/408986.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/163/408986.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/9' } },
        },
        character: {
            id: 9,
            url: 'http://www.tvmaze.com/characters/9/under-the-dome-james-big-jim-rennie',
            name: 'James "Big Jim" Rennie',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/2.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/2.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/9' } },
        },
        self: false,
        voice: false,
    },
    {
        person: {
            id: 4,
            url: 'http://www.tvmaze.com/people/4/eddie-cahill',
            name: 'Eddie Cahill',
            country: { name: 'United States', code: 'US', timezone: 'America/New_York' },
            birthday: '1978-01-15',
            deathday: null,
            gender: 'Male',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/0/1162.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/0/1162.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/people/4' } },
        },
        character: {
            id: 4,
            url: 'http://www.tvmaze.com/characters/4/under-the-dome-sam-verdreaux',
            name: 'Sam Verdreaux',
            image: {
                medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/17/44108.jpg',
                original: 'http://static.tvmaze.com/uploads/images/original_untouched/17/44108.jpg',
            },
            _links: { self: { href: 'http://api.tvmaze.com/characters/4' } },
        },
        self: false,
        voice: false,
    },
];
