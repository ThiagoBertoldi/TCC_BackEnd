import { Request, Response } from "express";
import { DeleteNotificacaoService } from "../../Service/Notificacao/DeleteNotificacaoService";

class DeleteNotificacaoController {
   async handle(req: Request, res: Response) {
      const { idNotificacao } = req.body

      let service = new DeleteNotificacaoService();

      const deleted = await service.execute({ idNotificacao });
      
      return res.json(deleted);
   }
}

export { DeleteNotificacaoController }