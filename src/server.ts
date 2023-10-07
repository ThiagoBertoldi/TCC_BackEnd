import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import 'express-async-errors'
import { routes } from "./router/router";

const bodyParserOptions = {
   limit: '10mb'
}

const app = express();
app.use(cors());
app.use(express.json(bodyParserOptions));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   if(err instanceof Error)
      return res.status(400).json({ data: { hasError: true, message: err?.message ?? "Não foi possível realizar a ação" } })

   return res.status(500).json({ data: { hasError: true, message: "Internal server error" } })
})

app.listen(3000, () => console.log("Server running..."));
