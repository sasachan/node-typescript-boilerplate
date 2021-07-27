import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import catchAsync from '../../utils/catchAsync';
import { auth } from '../../middlewares/auth.middleware';

class UserRoute {
    userController = new UserController();

  public path = '/';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}getUser`, auth('getUsers'),
    catchAsync(this.userController.getUserList));
  }
}

export default UserRoute;
