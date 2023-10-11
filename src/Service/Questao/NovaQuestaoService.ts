import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface NovaQuestaoRequest {
   descricaoQuestao: string,
   respostaCorreta: string,
   resposta1: string,
   resposta2: string,
   resposta3: string,
   resposta4: string,
   resposta5: string,
   idMateria: string,
   idProfessor: string
   moedas: string,
}

class NovaQuestaoService {
   async execute(objectRequest: NovaQuestaoRequest) {
      const { descricaoQuestao, respostaCorreta, resposta1, resposta2, resposta3, resposta4, resposta5, idMateria, moedas, idProfessor } = objectRequest

      if(!descricaoQuestao || !respostaCorreta || !resposta1 || !resposta2 || !idMateria)
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
         respostaCorreta,
         resposta1, 
         resposta2, 
         resposta3, 
         resposta4, 
         resposta5,
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