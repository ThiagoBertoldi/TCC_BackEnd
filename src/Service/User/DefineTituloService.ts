import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface DefineTituloInterface {
   idAluno: string;
   titulo: string;
}

class DefineTituloService {
   async execute({ idAluno, titulo }: DefineTituloInterface) {
      if(!idAluno || !titulo)
         throw new Error('Não foi possível definir o título')

      const existeTitulo = await client.db('TCC').collection('TituloAluno').findOne({ idAluno: new ObjectId(idAluno) })

      if(existeTitulo?._id) {
         const updateTitulo = await client.db('TCC').collection('TituloAluno').updateOne({ idAluno: new ObjectId(idAluno) }, { $set: { titulo } })
         if(!updateTitulo)
            throw new Error('Não foi possível atualizar o título')
      } else {
         const setNovoTitulo = await client.db('TCC').collection('TituloAluno').insertOne({ idAluno: new ObjectId(idAluno), titulo })
         if(!setNovoTitulo?.insertedId)
            throw new Error('Não foi possível definir o título')
      }
      
      return titulo;
   }
}

export { DefineTituloService }