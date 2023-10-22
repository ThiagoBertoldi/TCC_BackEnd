import { Request, Response } from "express";
import { AddAlunosMateriaService } from "../../Service/Materia/AddAlunoMateriaService";

class AddAlunoMateriaController {
   async handle(req: Request, res: Response) {
      const { idMateria, alunos } = req.body
      
      let service = new AddAlunosMateriaService()

      let result = await service.execute({ idMateria, alunos })

      return res.json(result)
   }
}

export { AddAlunoMateriaController }