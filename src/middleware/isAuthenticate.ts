import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


function validToken(req: Request, res: Response, next: NextFunction) {
   const authToken = req.headers.authorization;
   if(!authToken) return res.status(401).json({ data: { hasError: true, message: 'Não autorizado' } })
   
   const [, token] = authToken.split(" ")

   try {
      // pega id do usuário
      const { sub } = verify(token, process.env.SECRET)

      req.user_id = sub as string;

      return next()
   }catch(err) {
      return res.status(401).json({ data: { hasError: true, message: 'Não autorizado' } })
   }
}

export { validToken }