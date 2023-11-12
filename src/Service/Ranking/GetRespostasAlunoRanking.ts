import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetRespostasAlunoInterface {
  idAluno: string;
  idMateria: string;
}

class GetRespostasAlunoRankingService {
  async execute({ idAluno, idMateria }: GetRespostasAlunoInterface) {
    if (!idAluno || !idMateria)
      throw new Error('Não foi possível buscar as respostas')

    const aluno = await client.db('TCC').collection('User').findOne({ _id: new ObjectId(idAluno) })

    const respondidas = await client.db('TCC').collection('Respostas').find({ idMateria: new ObjectId(idMateria), idAluno: new ObjectId(idAluno) })
    let respostas = await respondidas.toArray()

    let listaRespostas = {
      nome: aluno.username,
      email: aluno.email,
      respostas: [],
      acertos: 0,
      erros: 0,
      total: 0,
      moedas: 0
    }

    for await (var resposta of respostas) {
      let questao = await client.db('TCC').collection('Questao').findOne({ _id: new ObjectId(resposta.idQuestao) })
      if(!questao?._id) continue

      listaRespostas.total++

      listaRespostas.respostas.push({
        descricao: questao.descricaoQuestao,
        acerto: resposta.respostaCorreta
      })

      if(resposta.respostaCorreta) {
        listaRespostas.acertos++
        listaRespostas.moedas += questao.moedas
      }
      else
        listaRespostas.erros++
    }
    
    return listaRespostas;
  }
}

export { GetRespostasAlunoRankingService }