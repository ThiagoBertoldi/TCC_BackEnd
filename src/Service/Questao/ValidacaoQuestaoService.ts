import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface DadosQuestaoRespondida {
   idAula: string,
   idQuestao: string,
   idMateria: string,
   idAluno: string,
   qntdMoedas: number,
   respostaCorreta: boolean
}

class ValidaQuestaoService {
   async execute({ idAula, idQuestao, idMateria, idAluno, qntdMoedas, respostaCorreta }: DadosQuestaoRespondida) {
      if (!idAula || !idQuestao || !idMateria)
         throw new Error('Erro ao validar questão')

      let dto = {
         idAula: new ObjectId(idAula),
         idQuestao: new ObjectId(idQuestao),
         idMateria: new ObjectId(idMateria),
         idAluno: new ObjectId(idAluno),
         respostaCorreta,
         qntdMoedas
      }

      const gravaResposta = await client.db('TCC').collection('Respostas').insertOne(dto)
      if (!gravaResposta?.insertedId) {
         throw new Error('Erro ao gravar resposta')
      } else {
         if (respostaCorreta) {
            console.log('resposta está correta')
            await this.gravaMoedas(idAluno, idMateria, qntdMoedas)
            await this.gravaXp(idAluno)
         }
      }

      return { gravaResposta, respostaCorreta };
   }

   async gravaXp(idAluno: string) {
      const existeXp = await client.db('TCC').collection('ExperienciaAluno').findOne({ idAluno: new ObjectId(idAluno) })
      
      if(existeXp?._id) {
         await client.db('TCC').collection('ExperienciaAluno').updateOne({ _id: existeXp._id }, { $set: { xp: 10 + existeXp?.xp ?? 0 }})
      } else {
         await client.db('TCC').collection('ExperienciaAluno').insertOne({ idAluno: new ObjectId(idAluno), xp: 10 })
      }
   }

   async gravaMoedas(idAluno: string, idMateria: string, qntdMoedas: number) {
      const existeCarteira = await client.db('TCC').collection('CarteiraAluno').findOne({ idAluno: new ObjectId(idAluno), idMateria: new ObjectId(idMateria) })

      let gravacao = {
         idAluno: new ObjectId(idAluno),
         idMateria: new ObjectId(idMateria)
      }

      if (existeCarteira?._id) {
         await client.db('TCC').collection('CarteiraAluno').updateOne({ _id: existeCarteira._id }, { $set: { moedas: qntdMoedas + existeCarteira?.moedas ?? 0 } })
      } else {
         let newGravacao = Object.assign(gravacao, { moedas: qntdMoedas })
         await client.db('TCC').collection('CarteiraAluno').insertOne(newGravacao)
      }
   }
}

export { ValidaQuestaoService }