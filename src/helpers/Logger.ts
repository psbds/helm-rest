import * as winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
});

if (process.env.NODE_ENV != "unit-test") {
    if (process.env.log == "file") {
        logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
        logger.add(new winston.transports.File({ filename: 'logs/combined.log' }));
    } else {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
}

export default logger;