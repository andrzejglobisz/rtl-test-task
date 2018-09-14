interface AppConfig {
    ENV_MODE: string;
    LISTENING_PORT: number;
    MONGODB_RECONNECT_ATTEMPTS: number;
    MONGODB_RECONNECT_INTERVAL: number;
    MONGODB_URI: string;
    MOVIES_URI: string;
    SERVICE_NAME: string;
    TVMAZE_URI: string;
    MOVIES_PER_PAGE: number;
    LAST_PAGE: number;
}

const {
    ENV_MODE,
    LISTENING_PORT,
    MONGODB_RECONNECT_ATTEMPTS,
    MONGODB_RECONNECT_INTERVAL,
    MONGODB_URI,
    MOVIES_URI,
    npm_package_name,
} = process.env;

const DEFAULT_LISTENING_PORT = 4010;
const DEFAULT_MONGODB_URI = 'mongodb://movies-mongo:27017/movies';
const DEFAULT_MONGODB_RECONNECT_ATTEMPTS = 3;
const DEFAULT_MONGODB_RECONNECT_INTERVAL = 10;
const DEFAULT_MOVIES_URI = 'http://movies-api:4000/movies-api';

const CONFIG: AppConfig = {
    LISTENING_PORT: Number(LISTENING_PORT) || DEFAULT_LISTENING_PORT,
    MONGODB_URI: MONGODB_URI || DEFAULT_MONGODB_URI,
    MONGODB_RECONNECT_ATTEMPTS: Number(MONGODB_RECONNECT_ATTEMPTS) || DEFAULT_MONGODB_RECONNECT_ATTEMPTS,
    MONGODB_RECONNECT_INTERVAL: Number(MONGODB_RECONNECT_INTERVAL) || DEFAULT_MONGODB_RECONNECT_INTERVAL,
    MOVIES_URI: MOVIES_URI || DEFAULT_MOVIES_URI,
    ENV_MODE: ENV_MODE || 'DEV',
    SERVICE_NAME: npm_package_name || 'scrapper-svc',
    TVMAZE_URI: 'http://api.tvmaze.com',
    MOVIES_PER_PAGE: 250,
    LAST_PAGE: 300,
};

export default CONFIG;
