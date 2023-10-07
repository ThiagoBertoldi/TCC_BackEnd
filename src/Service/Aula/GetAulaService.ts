import { client } from "../../database/client"

interface GetAula {
   idProfessor: string
}

class GetAulaService {
   async execute({ idProfessor }: GetAula) {
      const projection = { idProfessor: 0, idMateria: 0 }
      
      return await client.db('TCC').collection('Aula').find({ idProfessor }, { projection })
   }
}

export { GetAulaService }