import { Request, Response } from "express";
import { GetTitulosService } from "../../Service/Titulo/GetTitulosService";

class GetTitulosController {
   async handle(req: Request, res: Response) {
      const service = new GetTitulosService();

      const titulos = await service.execute();
      
      let response = await titulos.toArray()
      
      return res.json(response);
   }
}

export { GetTitulosController }