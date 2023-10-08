import { Request, Response } from "express";
import { GetBackgroundService } from "../../Service/Materia/GetBackgroundService";

class GetBackgroundController {
   async handle(req: Request, res: Response) {
      let idMateria = req.body.idMateria
      
      let service = new GetBackgroundService()

      let background = await service.execute({ idMateria })

      return res.json(background)
   }
}

export { GetBackgroundController }