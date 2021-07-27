// istanbul ignore file
import * as http from 'http';
import * as path from 'path';
import { AddressInfo } from 'net';
import * as passport from 'passport';
import logger from './helpers/logger';
import App from './App';
import Environment from './environments/environment';
import jwtStrategy from './config/passport';

global.__rootdir = path.resolve(__dirname, '../');

const env: Environment = new Environment();
env.setEnvironment(process.env.NODE_ENV);



const port: string | undefined | number = process.env.PORT || 3146;
const app: App = new App();

let server: http.Server; 

function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // handle specific error codes here.
    throw error;
}

function serverListening(): void {
    const addressInfo: AddressInfo = <AddressInfo>server.address();
    logger.info(`Listening on ${addressInfo.address}:${port}`);
}

app
  .init()
  .then(() => {
 
    app.express.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    app.express.set('port', port);

    server = app.httpServer; // http.createServer(App);
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(port);
      
  })
  .catch((err: Error) => {
    logger.info('app.init error');
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);
    process.exit(1);
  });

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
  // application specific logging, throwing an error, or other logic here
});