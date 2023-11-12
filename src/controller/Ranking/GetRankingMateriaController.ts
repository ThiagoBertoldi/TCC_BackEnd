import { Request, Response } from "express";
import { GetRankingMateriaService } from "../../Service/Ranking/GetRankingMateriaService";

class GetRankingMateriaController {
  async handle(req: Request, res: Response) {
    const { idMateria } = req.query;

    let service = new GetRankingMateriaService()

    let questao = await service.execute({ idMateria: idMateria as string })

    return res.json(questao)
  }
}

export { GetRankingMateriaController }