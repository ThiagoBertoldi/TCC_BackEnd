import { Request, Response } from "express";
import { GetAlunosMateriaService } from "../../Service/Materia/GetAlunosMateriaService";

class GetAlunosMateriaController {
  async handle(req: Request, res: Response) {
    let idMateria = req.query.idMateria

    let service = new GetAlunosMateriaService()

    let alunos = await service.execute({ idMateria: idMateria as string })

    return res.json(alunos)
  }
}

export { GetAlunosMateriaController }