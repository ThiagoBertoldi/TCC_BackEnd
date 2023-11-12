import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetNotificacoesInterface {
   idProfessor: string;
}

class GetNotificacoesService {
   async execute({ idProfessor }: GetNotificacoesInterface) {
      let notificacoes = await client.collection('NotificaProfessor').find({ idProfessorResponsavel: new ObjectId(idProfessor) })

      let response = await notificacoes.toArray()

      return response
   }
}

export { GetNotificacoesService }