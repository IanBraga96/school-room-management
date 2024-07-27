import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class UsersController {
  public async show({ response, params }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.ok(user)
    } catch (error) {
      return response.status(404).json({ message: 'Usuário não encontrado', error: error.message })
    }
  }

  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'birthDate', 'password', 'registration_number'])
      
      // Convertendo birthDate para DateTime, caso não seja nulo
      if (data.birthDate) {
        data.birthDate = DateTime.fromISO(data.birthDate)
      }

      const user = await User.create(data)
      return response.status(201).json(user)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao criar usuário', error: error.message })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const data = request.only(['name', 'email', 'password', 'registration_number', 'birthDate'])

      // Convertendo birthDate para DateTime, caso não seja nulo
      if (data.birthDate) {
        data.birthDate = DateTime.fromISO(data.birthDate)
      }

      user.merge(data)
      await user.save()
      return response.ok(user)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Usuário não encontrado', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message })
    }
  }

  public async delete({ response, params }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(204).send(user)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Usuário não encontrado', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao deletar usuário', error: error.message })
    }
  }
}
