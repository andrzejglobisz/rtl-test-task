import { getLogger } from 'log4js';
import * as mongoose from 'mongoose';
import { promisify } from 'util';

import CONFIG from './config';

const defaultLogger = getLogger();
const setTimeoutPromise = promisify(setTimeout);

const SECOND_IN_MS: number = 1000;
const reconnectAttempts: number = CONFIG.MONGODB_RECONNECT_ATTEMPTS;
const reconnectInterval: number = CONFIG.MONGODB_RECONNECT_INTERVAL * SECOND_IN_MS;

process.on('SIGINT', async () => {
    defaultLogger.info('[ MongoDB ] Closing all connections due to service termination ...');

    await mongoose.disconnect();
});

export default async function mongoConnector(): Promise<mongoose.Connection> {
    for (let i = 0; i < reconnectAttempts; i += 1) {
        try {
            if (i > 0) {
                await setTimeoutPromise(reconnectInterval);
            }

            defaultLogger.info(`[ MongoDB ] Connection attempt: ${i + 1}/${reconnectAttempts} ...`);

            await mongoose.connect(
                CONFIG.MONGODB_URI,
                { useNewUrlParser: true }
            );

            break;
        } catch (e) {
            defaultLogger.error(e.message);
        }
    }

    if (mongoose.connection.readyState !== 1) {
        throw new mongoose.mongo.MongoError('MongoDB connection could NOT be established!');
    }

    defaultLogger.info('[ MongoDB ] Connection has been established!');

    return mongoose.connection;
}
