import { Request, Response } from "express";
import { GetItensMercadoService } from "../../Service/Mercado/GerItensMercado";

class GetItensMercadoController {
   async handle(req: Request, res: Response) {
      const { idMateria } = req.query

      let service = new GetItensMercadoService()

      let itens = await service.execute({ idMateria: idMateria as string, idProfessor: req.user_id as string})
     
      return res.json(itens)
   }
}

export { GetItensMercadoController }