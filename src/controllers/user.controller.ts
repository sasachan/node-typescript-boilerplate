import { Request, Response } from 'express';

class UserController {

// this is just  for testing  if authentication and Authorization is working
  public getUserList = async (req: Request, res: Response): Promise<void> => {

    res.status(200).send('working');
  };


}

export default UserController;
