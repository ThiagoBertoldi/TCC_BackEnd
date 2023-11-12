import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetRespondidasInterface {
   idMateria: string,
   idAluno: string
}

class BuscaRespondidasService {
   async execute({ idMateria, idAluno }: GetRespondidasInterface) {
      if (!idMateria)
         throw new Error('Erro ao buscar respondidas')

      const questoes = await client.collection('Respostas').find({ idMateria: new ObjectId(idMateria), idAluno: new ObjectId(idAluno) })

      let response = await questoes.toArray()

      return response ?? [];
   }
}

export { BuscaRespondidasService }