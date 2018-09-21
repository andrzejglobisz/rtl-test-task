import { getLogger } from 'log4js';
import * as mongoose from 'mongoose';
import * as nconf from 'nconf';
import { promisify } from 'util';

import { AppConfig } from './types/config';

const defaultLogger = getLogger();
const setTimeoutPromise = promisify(setTimeout);

process.on('SIGINT', async () => {
    defaultLogger.info('[ MongoDB ] Closing all connections due to service termination ...');
    
    await mongoose.disconnect();
});

export default async function mongoConnector(): Promise<mongoose.Connection> {
    const reconnectAttempts: number = nconf.get(AppConfig.MONGODB_RECONNECT_ATTEMPTS);
    const reconnectInterval: number = nconf.get(AppConfig.MONGODB_RECONNECT_INTERVAL);
    for (let i = 0; i < reconnectAttempts; i += 1) {
        try {
            if (i > 0) {
                await setTimeoutPromise(reconnectInterval);
            }

            defaultLogger.info(`[ MongoDB ] Connection attempt: ${i + 1}/${reconnectAttempts} ...`);

            await mongoose.connect(
                nconf.get(AppConfig.MONGODB_URI),
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
