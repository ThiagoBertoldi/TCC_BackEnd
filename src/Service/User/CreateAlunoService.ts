import { ObjectId } from "mongodb";
import { client } from "../../database/client"
import bcrypt from 'bcrypt'

interface AlunoInterface {
   username: string;
   email: string;
   idProfessor: string;
}

class CreateAlunoService {
   async execute({ username, email, idProfessor }: AlunoInterface) {
      if(!email || !username)
         throw new Error('Não foi possível cadastrar o aluno')

      if(!email.includes("@"))
         throw new Error('Email inválido')

      if(username.length < 4)
         throw new Error('O nome de usuário deve ter pelo menos 4 caracteres')

      const existsUser = await client.db('TCC').collection('User').findOne({ email })
      if(existsUser)
         throw new Error('Esse email já está cadastrado')

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('@login1234', salt); 

      const user = await client.db('TCC').collection('User').insertOne({ email, pass: hash, username, idProfessorCadastro: new ObjectId(idProfessor), type: 2, created_at: new Date() })
      if(!user?.insertedId)
         throw new Error('Não foi possível cadastrar o usuário')
      
      return { user }
   }
}

export { CreateAlunoService }