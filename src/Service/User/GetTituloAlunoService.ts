import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetTituloAlunoInterface {
   idAluno: string;
}

class GetTituloAlunoService {
   async execute({ idAluno }: GetTituloAlunoInterface) {
      return await client.db('TCC').collection('TituloAluno').findOne({ idAluno: new ObjectId(idAluno) })
   }
}

export { GetTituloAlunoService }