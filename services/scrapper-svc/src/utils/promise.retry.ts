// tslint:disable no-any
import * as promiseRetry from 'promise-retry';
import { getLogger } from 'log4js';

import { AnyFunction, AsyncFunction } from '../types/types';
import { HTTP_STATUS } from '../types/status.codes';
import CONFIG from '../config';

const logger = getLogger();

export async function promiseRetryWrapper(fn: AsyncFunction): Promise<any> {
    let result;
    await promiseRetry(
        async (retry: AnyFunction, no: number) => {
            if (no !== 1) logger.info('Attempt number:', no);
            try {
                result = await fn();
            } catch (error) {
                logger.error(`${error.response.status}: ${error.response.statusText} `);
                if (error.response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
                    retry();
                }
                throw error;
            }
        },
        { minTimeout: CONFIG.RETRY_REQUEST_TIMEOUT }
    );

    return result;
}
