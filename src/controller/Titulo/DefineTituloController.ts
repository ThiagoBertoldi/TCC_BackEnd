import { Request, Response } from "express";
import { DefineTituloService } from "../../Service/Titulo/DefineTituloService";

class DefineTituloController {
   async handle(req: Request, res: Response) {
      const { titulo } = req.body

      let service = new DefineTituloService();

      const novoTitulo = await service.execute({ titulo, idAluno: req.user_id as string });
      
      return res.json(novoTitulo);
   }
}

export { DefineTituloController }