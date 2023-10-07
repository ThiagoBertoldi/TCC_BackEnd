import { Request, Response } from 'express';
import { CreateMateriaService } from '../../Service/Materia/CreateMateriaService'; 

class CreateMateriaController {
   async handle(req: Request, res: Response) {
      const { nomeMateria, turma } = req.body

      const service = new CreateMateriaService();

      const materia = await service.execute({ nomeMateria, turma, idProfessor: req.user_id as string });

      return res.json(materia);
   }
}

export { CreateMateriaController }