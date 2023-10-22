import { Request, Response } from "express";
import { GetAlunosService } from "../../Service/User/GetAlunoService";

class GetAlunosController {
   async handle(req: Request, res: Response) {
      const service = new GetAlunosService();

      const user = await service.execute();
      
      return res.json(user);
   }
}

export { GetAlunosController }