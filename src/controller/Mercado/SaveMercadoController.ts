import { Request, Response } from "express";
import { SaveMercadoService } from "../../Service/Mercado/SaveMercado";

class SaveMercadoController {
   async handle(req: Request, res: Response) {
      const { idMateria, itensMercado } = req.body

      let service = new SaveMercadoService()

      let questao = await service.execute({ itensMercado, idMateria: idMateria as string, idProfessor: req.user_id as string })

      return res.json({})
   }
}

export { SaveMercadoController }