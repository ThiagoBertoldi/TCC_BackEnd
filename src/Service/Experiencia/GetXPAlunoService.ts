import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetXPAlunoInterface {
  idAluno: string;
}

class GetXpAlunoService {
  async execute({ idAluno }: GetXPAlunoInterface) {
    if (!idAluno)
      throw new Error('Não foi possível encontrar o aluno')

    let xp = await client.collection('ExperienciaAluno').findOne({ idAluno: new ObjectId(idAluno) })
    if(!xp?._id) throw new Error('Aluno ainda não possui XP')

    return xp
  }
}

export { GetXpAlunoService }