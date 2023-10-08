import { client } from "../../database/client"
import { ObjectId } from "mongodb"

interface CreateAula {
   nomeAula: string,
   conteudoAula: string,
   idMateria: string,
   dataAula: string,
   idProfessor: string,
   posicaoX: string,
   posicaoY: string
}

class CreateAulaService {
   async execute({ nomeAula, conteudoAula, idMateria, dataAula, idProfessor, posicaoX, posicaoY }: CreateAula) {
      if (!nomeAula || !conteudoAula || !dataAula)
         throw new Error('Preencha todos os campos!')

      if (!idMateria)
         throw new Error('Não foi possível criar a aula')

      let idAula = new ObjectId()
      let idBoard = new ObjectId()

      const board = await client.db('TCC').collection('Board').insertOne({ _id: idBoard, idAula, created_at: new Date(), idProfessor })
      if (!board?.insertedId)
         throw new Error('Não foi possível criar o board de aula')

      const aula = await client.db('TCC').collection('Aula').insertOne({ _id: idAula, idBoard, nomeAula, conteudoAula, idMateria, dataAula, posicaoX, posicaoY, created_at: new Date(), idProfessor })
      if (!aula?.insertedId)
         throw new Error('Não foi possível criar a matéria')

      return aula;
   }
}

export { CreateAulaService }