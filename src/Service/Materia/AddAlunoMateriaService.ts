import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface AddAlunosInterface {
   idMateria: string,
   alunos: Array<string>
}

class AddAlunosMateriaService {
   async execute({ idMateria, alunos }: AddAlunosInterface) {
      if(!idMateria || alunos.length <= 0)
         throw new Error('Não foi possível adicionar os alunos')

      let alunosToInsert = []

      alunos.map(async aluno => {
         alunosToInsert.push({
            idMateria: new ObjectId(idMateria),
            idAluno: new ObjectId(aluno)
         })
      })

      const insertedAluno = await client.db('TCC').collection('MateriaAlunos').insertMany(alunosToInsert)
      if(!insertedAluno?.insertedIds)
         throw new Error('Não foi possível adicionar os alunos')

      return alunos;
   }
}

export { AddAlunosMateriaService }