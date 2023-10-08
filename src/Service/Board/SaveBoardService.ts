import { client } from "../../database/client";

interface SaveBoard {
   components: Array<Object>,
   idBoard: string,
   idProfessor: string
}

class SaveBoardService {
   async execute({ components, idBoard, idProfessor }: SaveBoard) {
      if (!idProfessor || !idBoard)
         throw new Error('Não foi possível salvar o board - X00001')

      const board = await client.db('TCC').collection('BoardComponent')

      await board.deleteMany({ idProfessor, idBoard })

      components.forEach(async component => {
         let inserted = await board.insertOne({ component, idProfessor, idBoard })
         if (!inserted?.insertedId)
            throw new Error('Não foi possível salvar o board - X00002')

      })
      return { components, idBoard };
   }
}

export { SaveBoardService }