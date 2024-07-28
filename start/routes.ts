/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import RoomsController from '#controllers/rooms_controller'
import AllocationsController from '#controllers/allocations_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

// Rotas para Usuários (Estudante)
// RF01: Cadastro e edição de dados de um usuário (somente administrador)
router.post('/users', [UsersController, 'create']).use(middleware.auth())// RF01 Rota para registro do usuario
router.put('/users/:id', [UsersController, 'update']).use(middleware.auth()) // Rota para editar Usuario

// RF02: Exclusão de um usuário (somente administrador)
router.delete('/users/:id', [UsersController, 'delete']).use(middleware.auth()) // Rota para Exluir Usuario

// RF03: Consulta de um usuário (somente administrador)
router.get('/users/:id', [UsersController, 'show']).use(middleware.auth())  // Rota para consultar Estudantes

// Rotas para Salas
// RF04: Cadastro de uma nova sala (somente administrador)
router.post('/rooms',[RoomsController, 'create']).use(middleware.auth()) // Rota para registro de Sala

// RF05: Edição dos dados de uma sala (somente administrador)
router.put('/rooms/:id', [RoomsController, 'update']).use(middleware.auth()) // Rota para editar Sala

// RF06: Exclusão dos dados de uma sala (somente administrador)
router.delete('/rooms/:id', [RoomsController, 'delete']).use(middleware.auth()) // Rota para Exluir Sala

// RF07: Consulta dos dados de uma sala (somente administrador)
router.get('/rooms/:id', [RoomsController, 'show']).use(middleware.auth()) // Rota para dados de uma sala

// Rotas para Alocação
// RF08: Alocar um usuário em uma sala (somente administrador)
router.post('/allocate', [AllocationsController, 'allocate']).use(middleware.auth()) // Rota para Alocar um aluno na sala

// RF09: Remover um usuário de uma sala (somente administrador)
router.delete('/deallocate', [AllocationsController, 'deallocate']).use(middleware.auth()) // Rota para retirar um aluno na sala

// RF10: Consulta das salas que um usuário deverá comparecer (usuário ainda não está autenticando)
router.get('/user/:id/rooms', [AllocationsController, 'userRooms']).use(middleware.auth()) // Rota para consultar a sala de um aluno

router.post('/teste', [AuthController, 'login']) // Rota para login e receber token

