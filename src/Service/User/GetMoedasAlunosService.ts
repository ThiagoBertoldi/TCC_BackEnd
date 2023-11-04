import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetMoedasAluno {
   idMateria: string;
   idAluno: string;
}

class GetMoedasAlunoService {
   async execute({ idMateria, idAluno }: GetMoedasAluno) {
      return await client.db('TCC').collection('CarteiraAluno').findOne({ idMateria: new ObjectId(idMateria), idAluno: new ObjectId(idAluno) })
   }
}

export { GetMoedasAlunoService }