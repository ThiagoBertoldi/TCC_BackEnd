import { client } from "../../database/client"
import bcrypt from 'bcrypt'

interface UserInterface {
   username: string;
   email: string;
   pass: string;
   confirmPass: string;
   type: string;
}

class CreateUserService {
   async execute({ username, email, pass, confirmPass, type }: UserInterface) {
      if(!email || !pass || !username || !confirmPass || !type)
         throw new Error('Todos os campos são obrigatórios')

      if(!email.includes("@"))
         throw new Error('Email inválido')

      if(username.length < 4)
         throw new Error('O nome de usuário deve ter pelo menos 4 caracteres')

      if(pass.length < 8)
         throw new Error('Senha muito fraca')

      if(pass != confirmPass)
         throw new Error('Senhas não são iguais')

      const existsUser = await client.collection('User').findOne({ email })
      if(existsUser)
         throw new Error('Esse email já está cadastrado')

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt); 

      const user = await client.collection('User').insertOne({ email, pass: hash, username, type, created_at: new Date() })
      if(!user?.insertedId)
         throw new Error('Não foi possível cadastrar o usuário')
      
      return { user }
   }
}

export { CreateUserService }