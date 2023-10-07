import { client } from "../../database/client";

interface GetMateriaInterface {
   idProfessor: string;
}

class GetMateriaService {
   async execute({ idProfessor }: GetMateriaInterface) {
      const projection = { idProfessor: 0  }
      
      return await client.db('TCC').collection('Materia').find({ idProfessor }, { projection })
   }
}

export { GetMateriaService }