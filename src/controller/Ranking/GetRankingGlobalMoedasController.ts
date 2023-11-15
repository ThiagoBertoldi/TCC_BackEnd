import { Request, Response } from "express";
import { GetRankingGlobalMoedasService } from "../../Service/Ranking/GetRankingGlobalMoedasService";

class GetRankingGlobalMoedasController {
  async handle(req: Request, res: Response) {
    let service = new GetRankingGlobalMoedasService()

    let top5 = await service.execute()

    return res.json(top5)
  }
}

export { GetRankingGlobalMoedasController }