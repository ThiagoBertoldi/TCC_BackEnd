import { ObjectId } from "mongodb"
import { client } from "../../database/client"

interface GetUserInterface {
   user_id: string
}

class GetUserService {
   async execute({ user_id }: GetUserInterface) {
      if(!user_id)
         throw new Error('Não foi possível receber os dados do usuário')

      let projection = { pass: 0, _id: 0 }

      const user = await client.db('TCC').collection('User').findOne({ _id: new ObjectId(user_id) }, { projection })
      if(!user)
         throw new Error('Usuário não encontrado')

      return { user }
   }
}

export { GetUserService }