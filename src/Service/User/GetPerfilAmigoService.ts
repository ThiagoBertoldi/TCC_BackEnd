import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetInfosInterface {
  idAmigo: string;
}

class GetInfosAmigoService {
  async execute({ idAmigo }: GetInfosInterface) {
    if(!idAmigo)
      throw new Error('Não foi possível buscar o usuário')

    const amigo = await client.collection('User').findOne({ _id: new ObjectId(idAmigo) })
    if (!amigo?._id)
      throw new Error('Usuário não encontrado')

    const titulo = await client.collection('TituloAluno').findOne({ idAluno: new ObjectId(amigo._id) })
    const xpAmigo = await client.collection('ExperienciaAluno').findOne({ idAluno: new ObjectId(amigo._id) })
  
    let infosResponse = {
      _id: amigo._id,
      nome: amigo.username,
      titulo: titulo?.titulo ?? 'Nenhum título',
      xp: xpAmigo?.xp ?? 0
    }

    return infosResponse
  }
}

export { GetInfosAmigoService }