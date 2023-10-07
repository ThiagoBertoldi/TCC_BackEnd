import { Request, Response } from 'express';
import { CreateUserService } from '../../Service/User/CreateUserService';

class CreateUserController {
   async handle(req: Request, res: Response) {
      const { email, pass, confirmPass, username, type } = req.body.dto

      const service = new CreateUserService();

      const user = await service.execute({ username, email, pass, confirmPass, type });

      return res.json(user);
   }
}

export { CreateUserController }