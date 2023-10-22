import { Request, Response } from "express";
import { GetMateriasAlunoService } from "../../Service/Materia/GetMateriasAlunoService";

class GetMateriasAlunoController {
   async handle(req: Request, res: Response) {
      let service = new GetMateriasAlunoService()

      let materias = await service.execute({ idAluno: req.user_id as string })

      return res.json(materias)
   }
}

export { GetMateriasAlunoController }