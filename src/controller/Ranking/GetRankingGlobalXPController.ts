import { Request, Response } from "express";
import { GetRankingGlobalXPService } from "../../Service/Ranking/GetRankingGlobalXPService";

class GetRankingGlobalXPController {
  async handle(req: Request, res: Response) {
    let service = new GetRankingGlobalXPService()

    let ranking = await service.execute()

    return res.json(ranking)
  }
}

export { GetRankingGlobalXPController }