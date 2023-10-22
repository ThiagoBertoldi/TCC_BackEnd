import { client } from "../../database/client"

class GetAlunosService {
   async execute() {
      let projection = { pass: 0 }

      const alunos = await client.db('TCC').collection('User').find({ type: 2 }, { projection })
      if(!alunos)
         throw new Error('Nenhum aluno encontrado')

      let listaAlunos = await alunos.toArray()

      return { listaAlunos }
   }
}

export { GetAlunosService }