import { NextFunction, Response, Request } from 'express';
import * as passport from 'passport';
import ApiError from '../utils/ApiError';
import { roleRights } from '../config/roles';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(401, 'Please authenticate', true, info));
  }
  req.user = user;
  if (requiredRights.length) {
    let hasRequiredRights = false;
    const userRights = roleRights.get(user.role);
    if (userRights && Array.isArray(userRights)) {
       hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    }
   
    if (!userRights || !hasRequiredRights) {
      return reject(new ApiError(403, 'Forbidden'));
    }
  }

  resolve();
  return null;
};

const auth = (...requiredRights: Array<string>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => new Promise((resolve, reject) => {
  passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
})
  .then(() => next())
  .catch((err) => next(err));

// to do if basic authentication is required 
const basicAuth = (text: string): boolean => text === 'correct';


export { auth, basicAuth };
