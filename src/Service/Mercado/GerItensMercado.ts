import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetItensMercadoInterface {
   idMateria: string;
   idProfessor: string;
}

class GetItensMercadoService {
   async execute({ idMateria, idProfessor }: GetItensMercadoInterface) {
      let projection = { idProfessor: 0, idMateria: 0, _id: 0 }
      return await client.db('TCC').collection('Mercado').findOne({ idMateria: new ObjectId(idMateria), idProfessor: new ObjectId(idProfessor) }, { projection })
   }
}

export { GetItensMercadoService }