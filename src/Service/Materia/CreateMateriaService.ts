import { client } from "../../database/client";

interface MateriaInterface {
   nomeMateria: string;
   turma: string;
   idProfessor: string;
}

class CreateMateriaService {
   async execute({ nomeMateria, turma, idProfessor }: MateriaInterface) {
      if(!nomeMateria || !turma)
         throw new Error('Nome da matéria e turma são obrigatórios')

      const materia = await client.db('TCC').collection('Materia').insertOne({ nomeMateria, turma, idProfessor, created_at: new Date() })
      if(!materia?.insertedId)
         throw new Error('Não foi possível criar a matéria')

      return materia;
   }
}

export { CreateMateriaService }