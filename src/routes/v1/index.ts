import { Router } from 'express';
import AuthRoute from './auth.route';
import UserRoute from './user.route';

class IndexRoute{
    constructor(){
        this.initializeRoutes();
    }

    public router = Router();

    private  defaultRoutes = [
        {
          path: '/auth',
          route: new AuthRoute(),
        },
        {
          path: '/user',
          route: new UserRoute(),
        }
      ];
      
 
      public initializeRoutes(){
        this.defaultRoutes.forEach((routeObj) => {
            this.router.use(routeObj.path, routeObj.route.router);
          });
      }
      
     
}


export default IndexRoute;


