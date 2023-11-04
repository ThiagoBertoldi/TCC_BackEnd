import { Request, Response } from "express";
import { GetMoedasAlunoService } from "../../Service/User/GetMoedasAlunosService";

class GetMoedasAlunoController {
   async handle(req: Request, res: Response) {
      const { idMateria } = req.query

      let service = new GetMoedasAlunoService();

      const moedas = await service.execute({ idMateria: idMateria as string, idAluno: req.user_id as string });
      
      return res.json(moedas);
   }
}

export { GetMoedasAlunoController }