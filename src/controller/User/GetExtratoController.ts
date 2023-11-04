import { Request, Response } from "express";
import { GetExtratoService } from "../../Service/User/GetExtratoService";

class GetExtratoController {
   async handle(req: Request, res: Response) {

      let service = new GetExtratoService();

      const moedas = await service.execute({ idAluno: req.user_id as string });
      
      return res.json(moedas);
   }
}

export { GetExtratoController }