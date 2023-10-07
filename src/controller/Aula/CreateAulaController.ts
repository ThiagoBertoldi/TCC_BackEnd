import { Request, Response } from "express";
import { CreateAulaService } from "../../Service/Aula/CreateAulaService";

class CreateAulaController {
   async handle(req: Request, res: Response) {
      const { nomeAula, conteudoAula, dataAula, idMateria } = req.body
      const idProfessor = req.user_id as string;
      
      let service = new CreateAulaService()

      let aula = await service.execute({ nomeAula, conteudoAula, dataAula, idMateria, idProfessor })

      return res.json(aula)
   }
}

export { CreateAulaController }