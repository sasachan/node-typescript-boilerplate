import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import { generateAuthToken } from '../services/token.service';
import { loginUserWithEmailAndPassword } from '../services/auth.service';
import { filterResponse } from '../utils/util';
import tokenTypes from '../config/tokens';

class AuthController {
  public signUp = async (req: Request, res: Response): Promise<void> => {
    const user = await createUser(req.body);
    const castUser = user as unknown as Record<string, unknown>;
    const response = filterResponse(castUser);
    res.status(200).send(response);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    const accessToken = await generateAuthToken(user, tokenTypes.ACCESS);
    const refreshToken = await generateAuthToken(user, tokenTypes.REFRESH);
    res.send({ access: accessToken, refresh: refreshToken });
  };


}

export default AuthController;
