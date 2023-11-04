import { Request, Response } from "express";
import { BuscaRespondidasService } from "../../Service/Questao/BuscaRespondidasService";

class BuscaRespondidasController {
   async handle(req: Request, res: Response) {
      const {
         idMateria
      } = req.query;

      let service = new BuscaRespondidasService()

      let questoes = await service.execute({ idAluno: req.user_id as string, idMateria: idMateria as string })

      return res.json(questoes)
   }
}

export { BuscaRespondidasController }