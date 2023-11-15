import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetAlunosMateriaInterafce {
  idMateria: string;
}

class GetAlunosMateriaService {
  async execute({ idMateria }: GetAlunosMateriaInterafce) {
    if (!idMateria)
      throw new Error('Matéria não encontrada')

    const alunosMateria = await client.collection('MateriaAlunos').find({ idMateria: new ObjectId(idMateria) })
    if (!alunosMateria)
      throw new Error('Não foram encontrados os alunos dessa matéria')

    let response = []

    for await(let aluno of alunosMateria) {
      let user = await client.collection('User').findOne({ _id: new ObjectId(aluno.idAluno) })
      let titulo = await client.collection('TituloAluno').findOne({ idAluno: new ObjectId(aluno.idAluno) })
      let xp = await client.collection('ExperienciaAluno').findOne({ idAluno: new ObjectId(aluno.idAluno) })

      let objeto = {
        idAluno: user._id,
        nome: user.username,
        titulo: titulo?.titulo ?? 'Sem título',
        xp: xp?.xp ?? 0
      }

      response.push(objeto)
    }

    return response;
  }
}

export { GetAlunosMateriaService }