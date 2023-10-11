import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface AttQuestaoRequest {
   descricaoQuestao: string,
   respostaCorreta: string,
   resposta1: string,
   resposta2: string,
   resposta3: string,
   resposta4: string,
   resposta5: string,
   idAula: string,
   idMateria: string,
   idProfessor: string
   moedas: string,
}

class AttQuestaoService {
   async execute(objectRequest: AttQuestaoRequest) {
      const { descricaoQuestao, respostaCorreta, resposta1, resposta2, resposta3, resposta4, resposta5, idMateria, moedas, idProfessor, idAula } = objectRequest

      if (!descricaoQuestao || !respostaCorreta || !resposta1 || !resposta2 || !idMateria)
         throw new Error('Questão inválida')

      let insert = {
         $set: {
            descricaoQuestao,
            respostaCorreta,
            resposta1,
            resposta2,
            resposta3,
            resposta4,
            resposta5,
            moedas,
            idMateria: new ObjectId(idMateria),
            idProfessor: new ObjectId(idProfessor),
            idAula: new ObjectId(idAula),
            created_at: new Date()
         }
      }

      const questao = await client.db('TCC').collection('Questao').updateOne({ idAula: new ObjectId(idAula) }, insert)
      if (!questao)
         throw new Error('Não foi possível alterar a matéria')

      return questao;
   }
}

export { AttQuestaoService }