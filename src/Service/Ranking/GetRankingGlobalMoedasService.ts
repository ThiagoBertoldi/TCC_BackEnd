import { client } from "../../database/client"

class GetRankingGlobalMoedasService {
  async execute() {
    let top10 = await client.collection('CarteiraAluno').aggregate([
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
          'titulo.idAluno': 0
        }
      },
      {
        $group: {
          _id: "$idAluno",
          total: { $sum: "$moedas" },
          nome: { $first: "$aluno.username" },
          titulo: { $first: "$titulo.titulo" }
        }
      },
      {
        $sort: { total: -1 }
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

export { GetRankingGlobalMoedasService }