import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetExtratoInterface {
   idAluno: string;
}

class GetExtratoService {
   async execute({ idAluno }: GetExtratoInterface) {
      
      let objetosFinais = []
      const extratos = await client.collection('ExtratoAluno').find({ idAluno: new ObjectId(idAluno) })

      let response = await extratos.toArray()

      for await (const item of response) {
         const materia = await client.collection('Materia').findOne({ _id: new ObjectId(item.idMateria) })

         objetosFinais.push({
            created_at: item.created_at,
            nomeMateria: materia.nomeMateria,
            turma: materia.turma,
            nomeItem: item.itemComprado,
            moedas: item.moedas,
            saldoAnterior: item.saldoAnterior,
            novoSaldo: item.novoSaldo
         })
      }

      return { objetosFinais }
   }
}

export { GetExtratoService }