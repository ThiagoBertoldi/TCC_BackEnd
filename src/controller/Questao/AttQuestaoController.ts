import { Request, Response } from "express";
import { AttQuestaoService } from "../../Service/Questao/AttQuestaoService";

class AttQuestaoController {
   async handle(req: Request, res: Response) {
      const {
         descricaoQuestao, 
         respostaCorreta, 
         resposta1, 
         resposta2, 
         resposta3, 
         resposta4, 
         resposta5,
         idMateria,
         idAula,
         moedas
      
      } = req.body;

      let service = new AttQuestaoService()

      let objectRequest = {
         descricaoQuestao,
         respostaCorreta,
         resposta1,
         resposta2,
         resposta3,
         resposta4,
         resposta5,
         idMateria,
         idAula,
         idProfessor: req.user_id as string,
         moedas
      }

      let questao = await service.execute(objectRequest)

      return res.json(questao)
   }
}

export { AttQuestaoController }