import { Context } from 'koa';
import { getLogger } from 'log4js';
import { AsyncFunction } from '../types/types';

export enum HTTP_STATUS {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

const logger = getLogger();

export const errorHandlerMiddleware = async (ctx: Context, next: AsyncFunction) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.statusCode || error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
        ctx.body = {
            message: error.message,
        };
        ctx.app.emit('error', error, ctx);
    }
};

export const errorEmitter = (error: Error, ctx: Context) => logger.error(ctx.status, `${error}`);
