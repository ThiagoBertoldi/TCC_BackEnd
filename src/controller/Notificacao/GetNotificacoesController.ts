import { Request, Response } from "express";
import { GetNotificacoesService } from "../../Service/Notificacao/NotificacoesProfessorService";

class GetNotificacoesController {
   async handle(req: Request, res: Response) {
      let service = new GetNotificacoesService();

      const notificacoes = await service.execute({ idProfessor: req.user_id as string });
      
      return res.json(notificacoes);
   }
}

export { GetNotificacoesController }