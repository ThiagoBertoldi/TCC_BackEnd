import { Request, Response } from "express";
import { AttQuestaoService } from "../../Service/Questao/AttQuestaoService";

class AttQuestaoController {
   async handle(req: Request, res: Response) {
      const {
         descricaoQuestao,
         idMateria,
         listaRespostas,
         idAula,
         moedas
      
      } = req.body;

      let service = new AttQuestaoService()

      let questao = await service.execute({ descricaoQuestao, listaRespostas, idAula, idMateria, idProfessor: req.user_id as string, moedas })

      return res.json(questao)
   }
}

export { AttQuestaoController }