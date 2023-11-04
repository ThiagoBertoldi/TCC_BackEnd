import { Request, Response } from "express";
import { ValidaQuestaoService } from "../../Service/Questao/ValidacaoQuestaoService";

class ValidaQuestaoController {
   async handle(req: Request, res: Response) {
      const {
         idAula, 
         idMateria,
         idQuestao,
         qntdMoedas,
         respostaCorreta
      
      } = req.body;

      let service = new ValidaQuestaoService()

      let objectRequest = {
         idAula,
         idQuestao,
         idMateria,
         idAluno: req.user_id as string,
         qntdMoedas,
         respostaCorreta
      }

      let questao = await service.execute(objectRequest)

      return res.json(questao)
   }
}

export { ValidaQuestaoController }