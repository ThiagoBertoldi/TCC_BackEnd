import { Request, Response } from "express";
import { GetAulaService } from "../../Service/Aula/GetAulaService";

class GetAulaController {
   async handle(req: Request, res: Response) {
      const { idMateria } = req.query

      let service = new GetAulaService()

      let aulas = await service.execute({ idMateria: idMateria as string })

      let response = await aulas.toArray()

      return res.json(response)
   }
}

export { GetAulaController }