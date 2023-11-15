import { client } from "../../database/client"

class GetRankingGlobalXPService {
  async execute() {
    let top10 = await client.collection('ExperienciaAluno').aggregate([
      {
        $lookup: {
          from: 'User',
          localField: 'idAluno',
          foreignField: '_id',
          as: 'aluno'
        }
      },
      {
        $lookup: {
          from: 'TituloAluno',
          localField: 'idAluno',
          foreignField: 'idAluno',
          as: 'titulo'
        }
      },
      {
        $project: {
          'aluno.email': 0,
          'aluno.idProfessorCadastro': 0,
          'aluno.type': 0,
          'aluno.pass': 0,
          'titulo._id': 0,
          'titulo.idAluno': 0,
          idAluno: 0,
        }
      },
      {
        $sort: { xp: -1 }
      },
      {
        $limit: 10
      }
    ])

    if (!top10)
      throw new Error('Top 10 não encontrado')

    let response = await top10.toArray()
    return response
  }
}

export { GetRankingGlobalXPService }