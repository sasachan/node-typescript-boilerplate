import * as express from 'express';
import logger from './helpers/logger';

function registerRoutes(app: express.Application): void {
    logger.info(app.path());
}

export default registerRoutes;
