import { Request, Response } from "express";
import { SaveAulasService } from "../../Service/Aula/AttAulaService";

class AttAulasController {
   async handle(req: Request, res: Response) {
      const { elementsSave, backgroundBase64, id_materia } = req.body
      
      let service = new SaveAulasService()

      let aula = await service.execute({ elementsSave, backgroundBase64, id_materia })

      return res.json(aula)
   }
}

export { AttAulasController }