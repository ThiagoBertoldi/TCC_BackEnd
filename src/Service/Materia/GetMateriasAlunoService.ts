import { ObjectId } from "mongodb";
import { client } from "../../database/client";

interface GetMateriasAlunoInterface {
   idAluno: string
}

class GetMateriasAlunoService {
   async execute({ idAluno }: GetMateriasAlunoInterface) {
      if (!idAluno)
         throw new Error('Erro ao buscar as matérias do aluno')

      let projection = { _id: 0, idAluno: 0 }

      const getMateriasAluno = await client.collection('MateriaAlunos').find({ idAluno: new ObjectId(idAluno) }, { projection })
      if (!getMateriasAluno)
         throw new Error('Nenhuma matéria foi encontrada')

      let idsMaterias = []

      for await (var materia of getMateriasAluno) {
         idsMaterias.push(materia.idMateria)
      }

      let materias = []

      for await (var id of idsMaterias) {
         const materia = await client.collection('Materia').findOne({ _id: id })
         if(!materia)
            throw new Error('Não foi encontrado nenhuma matéria para esse aluno')

         materias.push(materia)
      }

      return materias;
   }
}

export { GetMateriasAlunoService }