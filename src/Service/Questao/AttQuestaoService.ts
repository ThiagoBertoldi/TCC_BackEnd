import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface AttQuestaoRequest {
   descricaoQuestao: string,
   listaRespostas: Array<Resposta>,
   idAula: string,
   idMateria: string,
   idProfessor: string,
   moedas: string
}

interface Resposta {
   descricao: string,
   respostaCorreta: boolean
}

class AttQuestaoService {
   async execute(objectRequest: AttQuestaoRequest) {
      const { descricaoQuestao, listaRespostas, idMateria, moedas, idProfessor, idAula } = objectRequest

      if (!descricaoQuestao || listaRespostas.length <= 1 || !idMateria)
         throw new Error('Questão inválida')

      let insert = {
         $set: {
            descricaoQuestao,
            listaRespostas,
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