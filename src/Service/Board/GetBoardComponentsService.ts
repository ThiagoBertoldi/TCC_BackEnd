import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetComponentsBoard {
   idBoard: string
}

class GetComponentsBoardService {
   async execute({ idBoard }: GetComponentsBoard) {
      if (!idBoard)
         throw new Error('Não foi possível carregar o board')

      let components = await client.db('TCC').collection('BoardComponent').find({ idBoard })

      let response = await components.toArray()

      return { response }
   }
}

export { GetComponentsBoardService }