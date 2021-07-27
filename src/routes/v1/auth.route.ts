import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import catchAsync from '../../utils/catchAsync';

class AuthRoute {
    authController = new AuthController();

  public path = '/';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, 
    catchAsync(this.authController.signUp));

    this.router.post(`${this.path}login`,
    catchAsync(this.authController.login));
  }
}

export default AuthRoute;
