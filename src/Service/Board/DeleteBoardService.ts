import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface DeleteBoard {
   idBoard: string
}

class DeleteBoardService {
   async execute({ idBoard }: DeleteBoard) {
      if (!idBoard)
         throw new Error('Não foi possível deletar o board')

      await client.db('TCC').collection('Board').deleteOne({ _id: new ObjectId(idBoard) })
      await client.db('TCC').collection('BoardComponent').deleteMany({ idBoard })
      await client.db('TCC').collection('Aula').deleteMany({ idBoard: new ObjectId(idBoard) })

      return { idBoard };
   }
}

export { DeleteBoardService }