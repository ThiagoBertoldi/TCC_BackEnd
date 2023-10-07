import { Request, Response } from "express";
import { LoginService } from "../../Service/User/LoginService";


class LoginController {
   async handle(req: Request, res: Response) {
      const { email, pass } = req.body;

      const service = new LoginService();

      const user = await service.execute({ email, pass });
      
      return res.json(user);
   }
}

export { LoginController }