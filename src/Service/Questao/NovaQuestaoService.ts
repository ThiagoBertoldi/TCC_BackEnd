import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface NovaQuestaoRequest {
   descricaoQuestao: string,
   listaRespostas: Array<Resposta>,
   idMateria: string,
   idProfessor: string
   moedas: string,
}

interface Resposta {
   respostaCorreta: boolean,
   descricao: string
}

class NovaQuestaoService {
   async execute(objectRequest: NovaQuestaoRequest) {
      const { descricaoQuestao, listaRespostas, idMateria, moedas, idProfessor } = objectRequest

      if(!descricaoQuestao || listaRespostas.length <= 1 || !idMateria)
         throw new Error('Questão inválida')

      let insertAula = {
         nomeAula: 'questao',
         conteudoAula: 'questao',
         idMateria: idMateria,
         idProfessor,
         dataAula: new Date(),
         posicaoX: 0,
         posicaoY: 0,
         tipoAula: 2,
         created_at: new Date()
      }

      let aula = await client.db('TCC').collection('Aula').insertOne(insertAula)
      if(!aula?.insertedId)
         throw new Error('Erro ao criar aula')

      let insert = { 
         descricaoQuestao, 
         listaRespostas,
         moedas,
         idMateria: new ObjectId(idMateria),
         idAula: aula.insertedId,
         idProfessor: new ObjectId(idProfessor),
         created_at: new Date() 
      }

      const questao = await client.db('TCC').collection('Questao').insertOne(insert)
      if(!questao?.insertedId)
         throw new Error('Não foi possível criar a matéria')

      return questao;
   }
}

export { NovaQuestaoService }