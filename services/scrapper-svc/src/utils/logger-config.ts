import * as nconf from 'nconf';
import { configure } from 'log4js';
import { resolve } from 'path';
import { AppConfig } from '../types/config';

export enum LOGGERS {
    HTTP = 'HTTP',
}

export default function configureLoggers() {
    const logFilePath = (logType: string) =>
        resolve(
            process.cwd(),
            'logs',
            `${logType}.${nconf.get(AppConfig.SERVICE_NAME)}.${nconf.get(AppConfig.ENV_MODE).toLowerCase()}.log`
        );

    configure({
        appenders: {
            console: { type: 'console' },
            access: {
                type: 'dateFile',
                filename: logFilePath('access'),
                keepFileExt: true,
                daysToKeep: 30,
            },
            app: {
                type: 'dateFile',
                filename: logFilePath('app'),
                keepFileExt: true,
                daysToKeep: 30,
            },
            default: {
                type: 'logLevelFilter',
                level: 'info',
                appender: 'app',
            },
        },
        categories: {
            default: { appenders: ['default', 'console'], level: 'debug' },
            HTTP: { appenders: ['access'], level: 'debug' },
        },
    });
}
