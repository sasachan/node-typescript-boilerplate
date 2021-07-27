import ApiError from '../utils/ApiError';
import { getUserByEmail } from './user.service';
import { isPasswordMatch } from '../utils/util';
import User from '../schemas/User';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const user = await getUserByEmail(email);
  if (!user || !(await isPasswordMatch(password, user.password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  return user;
};


/**
 * need to be done
 * 
 * 
 */
const forgotPassword = async (email: string): Promise<boolean> => email === 'T';


export { loginUserWithEmailAndPassword, forgotPassword };