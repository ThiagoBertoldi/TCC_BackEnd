import { Request, Response } from "express";
import { CompraItemService } from "../../Service/Mercado/ComprarItemService";

class CompraItemController {
   async handle(req: Request, res: Response) {
      const { idMateria, descricaoItem, moedasItem } = req.body

      let service = new CompraItemService()

      let request = {
         idMateria: idMateria as string, 
         idAluno: req.user_id as string,
         descricaoItem,
         moedasItem
      }

      let item = await service.execute(request)
     
      return res.json(item)
   }
}

export { CompraItemController }