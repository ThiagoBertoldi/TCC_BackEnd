import { Request, Response } from "express";
import { GetTituloAlunoService } from "../../Service/Titulo/GetTituloAlunoService";

class GetTituloAlunoController {
   async handle(req: Request, res: Response) {
      let service = new GetTituloAlunoService();

      const titulo = await service.execute({ idAluno: req.user_id as string });
      
      return res.json(titulo);
   }
}

export { GetTituloAlunoController }