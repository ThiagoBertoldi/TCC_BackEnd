import { client } from "../../database/client"

class GetTitulosService {
   async execute() {
      return await client.collection('Titulos').find({});
   }
}

export { GetTitulosService }