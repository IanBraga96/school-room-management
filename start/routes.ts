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

// Rotas para Usuários (Estudante)
// RF01: Cadastro e edição de dados de um usuário (somente administrador)
router.post('/users', [UsersController, 'create']) // RF01 Rota para registro do usuario
router.put('/users/:id', [UsersController, 'update']) // Rota para editar Usuario

// RF02: Exclusão de um usuário (somente administrador)
router.delete('/users/:id', [UsersController, 'delete']) // Rota para Exluir Usuario

// RF03: Consulta de um usuário (somente administrador)
router.get('/users/:id', [UsersController, 'show']) // Rota para consultar Estudantes

// Rotas para Salas
// RF04: Cadastro de uma nova sala (somente administrador)
router.post('/rooms',[RoomsController, 'create']) // Rota para registro de Sala

// RF05: Edição dos dados de uma sala (somente administrador)
router.put('/rooms/:id', [RoomsController, 'update']) // Rota para editar Sala

// RF06: Exclusão dos dados de uma sala (somente administrador)
router.delete('/rooms/:id', [RoomsController, 'delete']) // Rota para Exluir Sala

// RF07: Consulta dos dados de uma sala (somente administrador)
router.get('/rooms/:id', [RoomsController, 'show']) // Rota para dados de uma sala

// Rotas para Alocação
// RF08: Alocar um usuário em uma sala (somente administrador)
router.post('/allocate', [AllocationsController, 'allocate']) // Rota para Alocar um aluno na sala

// RF09: Remover um usuário de uma sala (somente administrador)
router.delete('/deallocate', [AllocationsController, 'deallocate']) // Rota para retirar um aluno na sala

// RF10: Consulta das salas que um usuário deverá comparecer (usuário ainda não está autenticando)
router.get('/user/:id/rooms', [AllocationsController, 'userRooms']) // Rota para consultar a sala de um aluno