import { Request, Response } from "express";
import { GetRespostasAlunoRankingService } from "../../Service/Ranking/GetRespostasAlunoRanking";

class GetRespostasAlunoRankingController {
  async handle(req: Request, res: Response) {
    const { idMateria, idAluno } = req.query;

    let service = new GetRespostasAlunoRankingService()

    let respostas = await service.execute({ idMateria: idMateria as string, idAluno: idAluno as string })

    return res.json(respostas)
  }
}

export { GetRespostasAlunoRankingController }