import { Router } from "express"
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
import { GetMateriasAlunoController } from "../controller/Materia/GetMateriasAlunoController"
import { ValidaQuestaoController } from "../controller/Questao/ValidaQuestaoController"
import { BuscaRespondidasController } from "../controller/Questao/BuscaRespondidasController"
import { GetMoedasAlunoController } from "../controller/User/GetMoedasAlunoController"
import { CompraItemController } from "../controller/Mercado/CompraItemController"
import { GetExtratoController } from "../controller/Extrato/GetExtratoController"
import { GetTitulosController } from "../controller/Titulo/GetTitulosController"
import { DefineTituloController } from "../controller/Titulo/DefineTituloController"
import { GetTituloAlunoController } from "../controller/Titulo/GetTituloAlunoController"
import { GetNotificacoesController } from "../controller/Notificacao/GetNotificacoesController"
import { DeleteNotificacaoController } from "../controller/Notificacao/DeleteNotificacaoController"

const routes = Router()

// Rotas Autenticação / Usuário
routes.post('/login', new LoginController().handle)
routes.post('/register', new CreateUserController().handle)
routes.get('/get-user', validToken, new GetUserController().handle)
routes.post('/create-aluno', validToken, new CreateAlunoController().handle)
routes.get('/get-alunos', validToken, new GetAlunosController().handle)
routes.get('/get-moedas', validToken, new GetMoedasAlunoController().handle)

// Títulos Aluno
routes.get('/get-titulos', validToken, new GetTitulosController().handle)
routes.post('/define-titulo', validToken, new DefineTituloController().handle)
routes.get('/get-titulo', validToken, new GetTituloAlunoController().handle)

// Extratos de Compras nas Matérias
routes.get('/get-extrato', validToken, new GetExtratoController().handle)

// Notificações Professor
routes.get('/notificacoes-professor', validToken, new GetNotificacoesController().handle)
routes.post('/exclusao-notificacao', validToken, new DeleteNotificacaoController().handle)

// Rotas Matéria
routes.post('/create-materia', validToken, new CreateMateriaController().handle)
routes.get('/get-materias', validToken, new GetMateriaController().handle)
routes.post('/get-background', validToken, new GetBackgroundController().handle)
routes.post('/adicionar-aluno-materia', validToken, new AddAlunoMateriaController().handle)
routes.get('/get-materias-aluno', validToken, new GetMateriasAlunoController().handle)

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
routes.post('/valida-questao', validToken, new ValidaQuestaoController().handle)
routes.get('/questoes-respondidas', validToken, new BuscaRespondidasController().handle)

// Rotas Mercado
routes.post('/att-mercado', validToken, new SaveMercadoController().handle)
routes.get('/get-itens-mercado', validToken, new GetItensMercadoController().handle)
routes.post('/comprar-item', validToken, new CompraItemController().handle)

export { routes }