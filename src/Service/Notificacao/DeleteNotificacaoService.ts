import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface DeleteNotificacaoInterface {
   idNotificacao: string;
}

class DeleteNotificacaoService {
   async execute({ idNotificacao }: DeleteNotificacaoInterface) {
      let deleted = await client.db('TCC').collection('NotificaProfessor').deleteOne({ _id: new ObjectId(idNotificacao) })
      if(!deleted)
         throw new Error('Não foi possível deletar esse registro')

      return !deleted
   }
}

export { DeleteNotificacaoService }