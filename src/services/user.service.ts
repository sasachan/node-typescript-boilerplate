import ApiError from '../utils/ApiError';
import UserRepository from '../repositories/UserRepository';
import User from '../schemas/User';
import { createHash } from '../utils/util';

const isEmailTaken = async (email): Promise<boolean> => {
  const userRepo = new UserRepository(User);
  const user = await userRepo.findOneWithFilter({ email } as User);
  return !!user;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody: User): Promise<User> => {
  const params = userBody;
  const userRepo = new UserRepository(User);
  if (await isEmailTaken(params.email)) {
    throw new ApiError(400, 'Email already taken');
  }
  params.password = await createHash(params.password);
  const user = await userRepo.save(params);
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: string): Promise<User> => {
  const userRepo = new UserRepository(User);
  return userRepo.findOne(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string): Promise<User> => {
  const userRepo = new UserRepository(User);
  return userRepo.findOneWithFilter({ email } as User);
};





export {
  createUser,
  getUserById,
  getUserByEmail
};
