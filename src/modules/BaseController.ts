import { Application, Router } from 'express';

abstract class BaseController {

    protected router: Router;

    protected constructor() {
        this.router =  Router();
    }

    public abstract register(express: Application): void;
}

export default BaseController;