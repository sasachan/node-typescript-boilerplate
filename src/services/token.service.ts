import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'typeorm';
import tokenTypes from '../config/tokens';
import Environment from '../environments/environment';
import TokenRepository from '../repositories/TokenRepository';
import Token from '../schemas/Token';
import User from '../schemas/User';



/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Date} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId: ObjectID, expires: Date, type: string): string => {
  const env = new Environment();
  const payload = {
    sub: userId,
    iat: (Date.now() / 1000),
    exp: (expires.getTime() / 1000),
    type,
  };

  return jwt.sign(payload, env.getSecret());
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Date} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token: string, userId: string, expires: Date, type: string, blacklisted: boolean = false): Promise<Token> => {
  const tokenRepo = new TokenRepository(Token);
  const tokenObj = { token,user: userId,expires,type,blacklisted } as Token;
  const tokenDoc = await tokenRepo.save(tokenObj);
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: string): Promise<Token> => {
  const env = new Environment();
  const tokenRepo = new TokenRepository(Token);
  const payload = jwt.verify(token, env.getSecret());
  const payloadGeneric = payload as unknown as Record<string, unknown>;
  const tokenObj = { token, type, user: <string>payloadGeneric.sub, blacklisted: false }  as Token;
  const tokenDoc = await tokenRepo.findOneWithFilter(tokenObj);
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthToken = async (user: User, type: string): Promise<Record<string,string|Date>> => {
  const env = new Environment();
  const userId = user._id.toString();
  let token: string ;
  let tokenExpires: Date;
  switch (type) {
    case tokenTypes.ACCESS:
      tokenExpires = new Date((Date.now() + (parseInt(env.getAccessExpirationMinutes(), 10) * 60000))); // adding no of minutes to current time
      token = generateToken(user._id, tokenExpires, tokenTypes.ACCESS);
        break;
    case tokenTypes.REFRESH:
      tokenExpires = new Date();
      tokenExpires.setDate(tokenExpires.getDate() + parseInt(env.getRefreshExpirationDays(), 10)); // adding no of days to current time
      token = generateToken(user._id, tokenExpires, tokenTypes.REFRESH);
      await saveToken(token, userId, tokenExpires, tokenTypes.REFRESH);
        break;
    default:
       break;
}
  
  return {
    token,
    expires: tokenExpires
  };
};




export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthToken
};
