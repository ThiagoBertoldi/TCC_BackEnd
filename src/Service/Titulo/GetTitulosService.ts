import { client } from "../../database/client"

class GetTitulosService {
   async execute() {
      return await client.db('TCC').collection('Titulos').find({});
   }
}

export { GetTitulosService }