import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface SaveMercadoRequest {
   itensMercado: Array<ItensMercado>,
   idMateria: string,
   idProfessor: string
}

interface ItensMercado {
   descricao: string,
   moedas: string | number 
}

class SaveMercadoService {
   async execute({ itensMercado, idMateria, idProfessor }: SaveMercadoRequest) {
      if (itensMercado.length <= 0 || !idMateria || !idProfessor)
         throw new Error('Não foi possível salvar o mercado')

      let dto = { itensMercado, idMateria: new ObjectId(idMateria), idProfessor: new ObjectId(idProfessor) }

      const mercado = await client.db('TCC').collection('Mercado').findOne({ idMateria: new ObjectId(idMateria) })
      if (!mercado?._id) {
         let inserted = await client.db('TCC').collection('Mercado').insertOne(dto)
         if(!inserted?.insertedId)
            throw new Error('Não foi possível inserir novo item ao mercado')
      } else {
         let newDto = { $set: dto }

         let updated = await client.db('TCC').collection('Mercado').updateOne({ idMateria: new ObjectId(idMateria) }, newDto)
         if(!updated)
            throw new Error('Não foi possível atualizar o item do mercado')
      }
         
      return mercado;
   }
}

export { SaveMercadoService }