import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { RegistrableController } from './controllers/RegisterableController';
import DbClient from './db/DbClient';
import logger from './helpers/logger';
import container from './inversify.config';
import IndexRoute from './routes/v1/index';
import TYPES from './types';

class App {
      

    public express: express.Application;

       
    public httpServer: http.Server;
 
    public indexRoute = new IndexRoute;
 
    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        await this.middleware();
        await this.setupDb();
        await this.setupTemplateEngine();
        this.setupRoutes();
        this.setupSwaggerDocs();
    }

 
    private async middleware(): Promise<void> {

        this.express.use(bodyParser.json());
        this.express.use(this.setupCors);
        this.express.use(cors());
        this.express.use(cookieParser());
        this.express.use(bodyParser.json({ limit: '100mb' }));
        this.express.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupCors(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let origin: string = req.header('Origin');
        if (!origin) {
            origin = '*';
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'x-picstagraph-token,authorization,Authorization,X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }

    }

   

    

    private setupRoutes(): void {
       this.express.use('/api/v1', this.indexRoute.router);
    
        // grabs the Controller from IoC container and registers all the endpoints
        const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
        controllers.forEach(controller => controller.register(this.express, '/api/v1'));
    }

    private setupSwaggerDocs(): void {
        logger.info('swagger c called');
        this.express.use('/swagger.yaml', (req: express.Request, res: express.Response) => {
            res.sendFile(path.resolve(`${__dirname}/../swagger/swagger.yaml`));
        });
        this.express.use('/docs', express.static(path.resolve(`${__dirname}/../swagger`)));
    }

    private async setupTemplateEngine(): Promise<void> {
        this.express.set('views', path.join(__dirname, '../views'));
        this.express.set('view engine', 'pug');
    }

    private async setupDb(): Promise<void> {
        const db = new DbClient();
        await db.connectDB();
        
    }


 

}

export default  App;