import { Request, Response } from "express";
import { GetXpAlunoService } from "../../Service/Experiencia/GetXPAlunoService";

class GetXPAlunoController {
  async handle(req: Request, res: Response) {

    let service = new GetXpAlunoService();

    const xp = await service.execute({ idAluno: req.user_id as string });

    return res.json(xp);
  }
}

export { GetXPAlunoController }