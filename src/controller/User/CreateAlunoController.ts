import { Request, Response } from 'express';
import { CreateAlunoService } from '../../Service/User/CreateAlunoService';

class CreateAlunoController {
   async handle(req: Request, res: Response) {
      const { email, username } = req.body
      const idProfessor = req.user_id

      const service = new CreateAlunoService();

      const user = await service.execute({ username, email, idProfessor: idProfessor as string });

      return res.json(user);
   }
}

export { CreateAlunoController }