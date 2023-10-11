import { Request, Response } from "express";
import { GetQuestaoService } from "../../Service/Questao/GetQuestaoService";

class GetQuestaoController {
   async handle(req: Request, res: Response) {
      const { idAula } = req.query

      let service = new GetQuestaoService()

      let questao = await service.execute({ idAula: idAula as string })

      return res.json(questao)
   }
}

export { GetQuestaoController }