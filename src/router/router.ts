import { Router, Request, Response, json } from "express"
import { validToken } from "../middleware/isAuthenticate"
import { CreateUserController } from "../controller/User/CreateUserController"
import { LoginController } from "../controller/User/LoginController"
import dotenv from 'dotenv'
import { CreateMateriaController } from "../controller/Materia/CreateMateriaController"
import { GetMateriaController } from "../controller/Materia/GetMateriaController"
import { CreateAulaController } from "../controller/Aula/CreateAulaController"
import { GetAulaController } from "../controller/Aula/GetAulaController"
import { SaveBoardController } from "../controller/Board/SaveBoardController"
import { GetComponentsController } from "../controller/Board/GetComponentsBoardController"
import { AttAulasController } from "../controller/Aula/AttAulasController"
import { GetBackgroundController } from "../controller/Materia/GetBackgroundController"

dotenv.config()

const routes = Router()

// Rotas Autenticação
routes.post('/login', new LoginController().handle)
routes.post('/register', new CreateUserController().handle)

// Rotas Matéria
routes.post('/create-materia', validToken, new CreateMateriaController().handle)
routes.get('/get-materias', validToken, new GetMateriaController().handle)
routes.post('/get-background', validToken, new GetBackgroundController().handle)

// Rotas Aula
routes.post('/create-aula', validToken, new CreateAulaController().handle)
routes.get('/get-aulas', validToken, new GetAulaController().handle)
routes.post('/salva-aulas', validToken, new AttAulasController().handle)

// Rotas Board
routes.post('/save-board', validToken, new SaveBoardController().handle) 
routes.get('/get-components', validToken, new GetComponentsController().handle)

// Test Route
routes.post('/teste', validToken, (req: Request, res: Response) => {
   return res.json({ ok: req.user_id })
})

export { routes }