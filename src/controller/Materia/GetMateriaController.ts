import { Request, Response } from "express";
import { GetMateriaService } from "../../Service/Materia/GetMateriasService";

class GetMateriaController {
   async handle(req: Request, res: Response) {
      let service = new GetMateriaService()

      let materias = await service.execute({ idProfessor: req.user_id as string })

      let response = await materias.toArray()

      return res.json(response)
   }
}

export { GetMateriaController }