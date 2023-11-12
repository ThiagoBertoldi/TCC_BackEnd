import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetItensMercadoInterface {
   idMateria: string;
}

class GetItensMercadoService {
   async execute({ idMateria }: GetItensMercadoInterface) {
      let projection = { idProfessor: 0, idMateria: 0 }
      return await client.collection('Mercado').findOne({ idMateria: new ObjectId(idMateria) }, { projection })
   }
}

export { GetItensMercadoService }