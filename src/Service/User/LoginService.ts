import { client } from "../../database/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

interface LoginInterface {
   email: string;
   pass: string;
}

class LoginService {
   async execute({ email, pass }: LoginInterface) {
      if(!email || !pass)
         throw new Error('Email e senha são obrigatórios')

      if(!email.includes('@'))
         throw new Error('Email inválido')

      if(!pass || pass.length < 8)
         throw new Error('Email ou senha inválido')

      const user = await client.db('TCC').collection('User').findOne({ email })
      if(!user) 
         throw new Error('Usuário não encontrado')

      const validPass = bcrypt.compareSync(pass, user?.pass)
      if(validPass) {
         const token = jwt.sign(
            {
               email: user?.email,
               username: user?.username
            }, 
            process.env.SECRET as string, 
            {
               subject: user._id.toString(),
               expiresIn: 3600
            });
   
         return { email, type: user?.type, username: user?.username, token }
      }
   
      throw new Error('Não foi possível realizar o login')
   }
}

export { LoginService }