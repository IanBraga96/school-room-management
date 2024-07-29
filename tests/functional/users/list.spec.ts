// test/functional/user.spec.js
import { test } from '@japa/runner'
import Allocation from '#models/allocation'

test.group('User', () => {
  let adminToken = ''
  let userId = ''
  let roomId = ''
  let userToken = ''

  test('Login de admin para pegar o token', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'admin@admin.com',
      password: 'senha'
    })
    adminToken = response.body().token.token
  })

// Testes de User

test('Criando um user como admin', async ({ client, assert }) => {
  const response = await client.post('/users')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      name: 'Usuario teste',
      email: 'testeee@teste.com',
      birthDate: '2000-01-01',
      password: 'password',
      registration_number: '549234251'
    })

  response.assertStatus(201)
  assert.equal(response.body().name, 'Usuario teste')
  assert.equal(response.body().email, 'testeee@teste.com')
  userId = response.body().id // Salva o ID do usuário para os próximos testes
})

test('Exibir um user como admin', async ({ client, assert }) => {
  const response = await client.get(`/users/${userId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  response.assertStatus(200)
  assert.equal(response.body().id, userId)
  assert.equal(response.body().name, 'Usuario teste')
})

test('Atualizar um user como admin', async ({ client, assert }) => {
  const response = await client.put(`/users/${userId}`)
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      name: 'Usuario teste atualizado',
      email: '131223@teste.com',
      birthDate: '2000-01-01',
      password: 'newpassword',
      registration_number: '549234455323251'
    })

  response.assertStatus(200)
  assert.equal(response.body().name, 'Usuario teste atualizado')
})

test('Deletar um user como admin', async ({ client }) => {
  const response = await client.delete(`/users/${userId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  response.assertStatus(204)

  const checkResponse = await client.get(`/users/${userId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  checkResponse.assertStatus(404)
})

// Testes de sala:

test('Criando uma sala como admin', async ({ client, assert }) => {
  const response = await client.post('/rooms')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      room_number: '101',
      capacity: 30
    })

  response.assertStatus(201)
  assert.equal(response.body().roomNumber, '101')
  assert.equal(response.body().capacity, 30)
  roomId = response.body().id // Salva o ID da sala para os próximos testes
})

test('Exibir uma sala como admin', async ({ client, assert }) => {
  const response = await client.get(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  response.assertStatus(200)
  assert.equal(response.body().id, roomId)
  assert.equal(response.body().roomNumber, '101')
})

test('Atualizar uma sala como admin', async ({ client, assert }) => {
  const response = await client.put(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      room_number: '104',
      capacity: 35
    })

  response.assertStatus(200)
  assert.equal(response.body().id, roomId)
  assert.equal(response.body().roomNumber, '104')
  assert.equal(response.body().capacity, 35)
})

test('Deletar uma sala como admin', async ({ client }) => {
  const response = await client.delete(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  response.assertStatus(204)

  const checkResponse = await client.get(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)

  checkResponse.assertStatus(404)
})

// Teste para alocar e desalocar user (aluno)

test('Alocar usuário na sala como admin (criando user e room)', async ({ client, assert }) => {
  // Criar usuário
  const userResponse = await client.post('/users')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      name: 'Usuario teste 2',
      email: 'teste540@teste.com',
      birthDate: '2000-01-01',
      password: 'password',
      registration_number: '540'
    })

  userResponse.assertStatus(201)
  userId = userResponse.body().id // Salva o ID do usuário para os próximos testes

  // Criar sala
  const roomResponse = await client.post('/rooms')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      room_number: '180',
      capacity: 30
    })

  roomResponse.assertStatus(201)
  roomId = roomResponse.body().id // Salva o ID da sala para os próximos testes

  // Alocar usuário na sala
  const allocationResponse = await client.post('/allocate')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      roomId: roomId,
      userId: userId
    })

  allocationResponse.assertStatus(201)
  assert.equal(allocationResponse.body().message, 'Usuário alocado com sucesso')
})

test('Desalocar usuário da sala como admin', async ({ client, assert }) => {
  // Desalocar usuário da sala
  const deallocationResponse = await client.delete('/deallocate')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      roomId: roomId,
      userId: userId
    })

  deallocationResponse.assertStatus(200)
  assert.equal(deallocationResponse.body().message, 'Usuário removido da sala com sucesso')

  //deletando  usuario
  const delresponse = await client.delete(`/users/${userId}`)
  .header('Authorization', `Bearer ${adminToken}`)
  //deletando sala
  const response = await client.delete(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)
})

test('Consulta das salas do usuário como aluno(Criando user, sala e alocando', async ({ client, assert }) => {
  // Criar usuário
  const userResponse = await client.post('/users')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      name: 'Usuario teste 3',
      email: 'teste580@teste.com',
      birthDate: '2000-01-01',
      password: 'password',
      registration_number: '580'
    })

  userResponse.assertStatus(201)
  userId = userResponse.body().id // Salva o ID do usuário para os próximos testes

  // Coleta de token do usuario
  const response = await client.post('/login').json({
    email: 'teste580@teste.com',
    password: 'password'
  })
  userToken = response.body().token.token

  // Criar sala
  const roomResponse = await client.post('/rooms')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      room_number: '120',
      capacity: 30
    })

  roomResponse.assertStatus(201)
  roomId = roomResponse.body().id // Salva o ID da sala para os próximos testes

  // Alocar usuário na sala
  const allocationResponse = await client.post('/allocate')
    .header('Authorization', `Bearer ${adminToken}`)
    .json({
      roomId: roomId,
      userId: userId
    })

  allocationResponse.assertStatus(201)

  // Consulta das salas do usuário como aluno
  const roomUserResponse = await client.get(`/users/rooms/${userId}`)
   .header('Authorization', `Bearer ${userToken}`) // Usa o token do usuários

   roomUserResponse.assertStatus(200)
   assert.equal(roomUserResponse.body().userName, 'Usuario teste 3')
   assert.include(roomUserResponse.body().rooms, 120) // Verifica se a sala '120' está na lista

     //deletando  usuario
  const delresponse = await client.delete(`/users/${userId}`)
  .header('Authorization', `Bearer ${adminToken}`)
  //deletando sala
  const delResponse = await client.delete(`/rooms/${roomId}`)
    .header('Authorization', `Bearer ${adminToken}`)

})

})