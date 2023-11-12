import { client } from "../../database/client"

interface GetAula {
   idMateria: string;
}

class GetAulaService {
   async execute({ idMateria }: GetAula) {
      const projection = { idProfessor: 0, idMateria: 0 }
      
      return await client.collection('Aula').find({ idMateria }, { projection })
   }
}

export { GetAulaService }