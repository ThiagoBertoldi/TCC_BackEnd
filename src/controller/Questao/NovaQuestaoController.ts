import { Request, Response } from "express";
import { NovaQuestaoService } from "../../Service/Questao/NovaQuestaoService";

class NovaQuestaoController {
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
         moedas
      
      } = req.body;

      let service = new NovaQuestaoService()

      let objectRequest = {
         descricaoQuestao,
         respostaCorreta,
         resposta1,
         resposta2,
         resposta3,
         resposta4,
         resposta5,
         idMateria,
         idProfessor: req.user_id as string,
         moedas
      }

      let questao = await service.execute(objectRequest)

      return res.json(questao)
   }
}

export { NovaQuestaoController }