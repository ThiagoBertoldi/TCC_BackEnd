import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetQuestaoInterface {
   idAula: string
}

class GetQuestaoService {
   async execute({ idAula }: GetQuestaoInterface) {
      if (!idAula)
         throw new Error('Erro ao buscar questão')

      const questao = await client.collection('Questao').findOne({ idAula: new ObjectId(idAula) })
      if (!questao)
         throw new Error('Erro ao buscar questão')

      return questao;
   }
}

export { GetQuestaoService }