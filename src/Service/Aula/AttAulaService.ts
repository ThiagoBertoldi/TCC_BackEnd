import { client } from "../../database/client"
import { ObjectId } from "mongodb"

interface SaveAulas {
   elementsSave: Array<Element>,
   backgroundBase64: string,
   id_materia: string
}

interface Element {
   id_aula: string,
   posicaoX: string,
   posicaoY: string
}

class SaveAulasService {
   async execute({ elementsSave, backgroundBase64, id_materia }: SaveAulas) {
      if (!elementsSave || elementsSave.length === 0)
         throw new Error('Nada gravado')
      
      elementsSave.map(async item => {
         let filter = { _id: new ObjectId(item.id_aula) }
         let att = { $set: { posicaoX: item.posicaoX, posicaoY: item.posicaoY } }

         await client.collection('Aula').updateOne(filter, att);
      })

      let idMateria = new ObjectId(id_materia);

      let existeImagem = await client.collection('BackgroundMateria').findOne({ idMateria })
      if(existeImagem?._id) {
         let filter = { _id: existeImagem._id }
         let att = { $set: { backgroundBase64 } }
         await client.collection('BackgroundMateria').updateOne(filter, att)
      } else {
         await client.collection('BackgroundMateria').insertOne({ backgroundBase64, idMateria  })
      }

      return null;
   }
}

export { SaveAulasService }