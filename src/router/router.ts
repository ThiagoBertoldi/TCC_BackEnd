import { Router, Request, Response, json } from "express"
import { validToken } from "../middleware/isAuthenticate"
import { CreateUserController } from "../controller/User/CreateUserController"
import { LoginController } from "../controller/User/LoginController"
import { CreateMateriaController } from "../controller/Materia/CreateMateriaController"
import { GetMateriaController } from "../controller/Materia/GetMateriaController"
import { CreateAulaController } from "../controller/Aula/CreateAulaController"
import { GetAulaController } from "../controller/Aula/GetAulaController"
import { SaveBoardController } from "../controller/Board/SaveBoardController"
import { GetComponentsController } from "../controller/Board/GetComponentsBoardController"
import { AttAulasController } from "../controller/Aula/AttAulasController"
import { GetBackgroundController } from "../controller/Materia/GetBackgroundController"
import { DeleteBoardController } from "../controller/Board/DeleteBoardController"
import { NovaQuestaoController } from "../controller/Questao/NovaQuestaoController"
import { GetQuestaoController } from "../controller/Questao/GetQuestaoController"
import { AttQuestaoController } from "../controller/Questao/AttQuestaoController"
import { SaveMercadoController } from "../controller/Mercado/SaveMercadoController"
import { GetItensMercadoController } from "../controller/Mercado/GetItensMercadoController"
import { GetUserController } from "../controller/User/GetUserController"
import { CreateAlunoController } from "../controller/User/CreateAlunoController"
import { GetAlunosController } from "../controller/User/GetAlunosController"
import { AddAlunoMateriaController } from "../controller/Materia/AddAlunoMateriaController"

const routes = Router()

// Rotas Autenticação / Usuário
routes.post('/login', new LoginController().handle)
routes.post('/register', new CreateUserController().handle)
routes.get('/get-user', validToken, new GetUserController().handle)
routes.post('/create-aluno', validToken, new CreateAlunoController().handle)
routes.get('/get-alunos', validToken, new GetAlunosController().handle)

// Rotas Matéria
routes.post('/create-materia', validToken, new CreateMateriaController().handle)
routes.get('/get-materias', validToken, new GetMateriaController().handle)
routes.post('/get-background', validToken, new GetBackgroundController().handle)
routes.post('/adicionar-aluno-materia', validToken, new AddAlunoMateriaController().handle)

// Rotas Aula
routes.post('/create-aula', validToken, new CreateAulaController().handle)
routes.get('/get-aulas', validToken, new GetAulaController().handle)
routes.post('/salva-aulas', validToken, new AttAulasController().handle)

// Rotas Board
routes.post('/save-board', validToken, new SaveBoardController().handle) 
routes.get('/get-components', validToken, new GetComponentsController().handle)
routes.post('/delete-board', validToken, new DeleteBoardController().handle)

// Rotas Questao
routes.get('/get-questao', validToken, new GetQuestaoController().handle)
routes.post('/create-questao', validToken, new NovaQuestaoController().handle)
routes.post('/update-questao', validToken, new AttQuestaoController().handle)

// Rotas Mercado
routes.post('/att-mercado', validToken, new SaveMercadoController().handle)
routes.get('/get-itens-mercado', validToken, new GetItensMercadoController().handle)

export { routes }