import { Request, Response } from "express";
import { GetUserService } from "../../Service/User/GetUserService";

class GetUserController {
   async handle(req: Request, res: Response) {
      const service = new GetUserService();

      const user = await service.execute({ user_id: req.user_id as string });
      
      return res.json(user);
   }
}

export { GetUserController }