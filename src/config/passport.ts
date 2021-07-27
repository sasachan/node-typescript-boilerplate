import { Strategy, ExtractJwt } from 'passport-jwt';
import tokenTypes from './tokens';
import Environment from '../environments/environment';
import { getUserById } from '../services/user.service';
import User from '../schemas/User';

type cb = (error: Error, user?: User | boolean, info?: string) => void;

const jwtVerify = async (payload, done: cb): Promise<void> => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);

  } catch (error) {
    done(error, false);
  }
  return null;
};


const jwtStrategy = (() => {
  const env = new Environment();
  const secret = env.getSecret();
  const jwtOptions = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  return new Strategy(jwtOptions, jwtVerify);
})();




export default jwtStrategy;
