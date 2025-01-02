import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

type LogOptions = {
	level?: string;
	message?: string;
	module?: string;
	function?: string;
	context?: unknown;
	delimiter?: string;
};

const { format, createLogger, transports } = winston;

const dailyRotateFileTransport = new DailyRotateFile({
	filename: 'logs/%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
});

const fileLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.prettyPrint(),
	),
	transports: [
		dailyRotateFileTransport,
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		}),
	],
});

const consoleLogger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.prettyPrint(),
	),
	transports: [
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		}),
	],
});

export const getErrorMessage = (error: unknown): string =>
	error instanceof Error ? error.message : 'An unknown error occurred';

export const logError = (options: LogOptions) =>
	fileLogger.log({
		...options,
		level: 'error',
		message: options.message || '',
	});

export const logInfo = (options: LogOptions) =>
	fileLogger.log({ ...options, level: 'info', message: options.message || '' });

export const log = logInfo;

export const printInfo = (options: LogOptions) =>
	consoleLogger.log({
		...options,
		level: 'info',
		message: options.message || '',
	});

export const print = printInfo;
