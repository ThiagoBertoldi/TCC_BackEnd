import { ObjectId } from "mongodb";
import { client } from "../../database/client"

interface GetRankingInterface {
  idMateria: string;
}

class GetRankingMateriaService {
  async execute({ idMateria }: GetRankingInterface) {
    if (!idMateria)
      throw new Error('Não foi possível buscar o ranking')

    const respostas = await client.collection('Respostas').find({ idMateria: new ObjectId(idMateria) })
    let response = await respostas.toArray()

    let ranking = [] 

    for await (var item of response) {
      let aluno = await client.collection('User').findOne({ _id: new ObjectId(item.idAluno) })
      let titulo = await client.collection('TituloAluno').findOne({ idAluno: new ObjectId(aluno._id) })
      
      if(!ranking[aluno.email])
        ranking[aluno.email] = { contador: 0, nome: aluno.username, _id: aluno._id, titulo: titulo?.titulo ?? null }

      if(item.respostaCorreta)
        ranking[aluno.email].contador++
    }
    
    const resultArray = Object.entries(ranking)
      .map(([email, { contador, nome, _id, titulo }]) => ({ email, contador, nome, _id, titulo }))
      .sort((a, b) => b.contador - a.contador);

    return resultArray;
  }
}

export { GetRankingMateriaService }