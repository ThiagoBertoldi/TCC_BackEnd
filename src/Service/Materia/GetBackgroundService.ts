import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetBackgroundInterface {
   idMateria: string
}

class GetBackgroundService {
   async execute({ idMateria }: GetBackgroundInterface) {
      if (!idMateria)
         throw new Error('Erro ao buscar mapa da matéria')

      const background = await client.collection('BackgroundMateria').findOne({ idMateria: new ObjectId(idMateria) })
      if (!background)
         throw new Error('Erro ao buscar mapa da matéria 2')

      return background;
   }
}

export { GetBackgroundService }