import { Request, Response } from "express";
import { GetAulaService } from "../../Service/Aula/GetAulaService";

class GetAulaController {
   async handle(req: Request, res: Response) {
      let service = new GetAulaService()

      let aulas = await service.execute({ idProfessor: req.user_id as string })

      let response = await aulas.toArray()

      return res.json(response)
   }
}

export { GetAulaController }