import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'
import User from '#models/user'
import Allocation from '#models/allocation'

export default class RoomsController {
  public async show({ response, params }: HttpContext) {
    try {
      const room = await Room.findOrFail(params.id)
      return response.ok(room)
    } catch (error) {
      return response.status(404).json({ message: 'Sala não encontrada', error: error.message })
    }
  }

  public async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['room_number', 'capacity'])
      const room = await Room.create(data)
      return response.status(201).json({ id: room.id, ...room.toJSON() })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erro ao criar sala', error: error.message })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    try {
      const room = await Room.findOrFail(params.id)
      const data = request.only(['room_number', 'capacity'])
      room.merge(data)
      await room.save()
      return response.ok(room)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Sala não encontrada', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao atualizar sala', error: error.message })
    }
  }

  public async delete({ response, params }: HttpContext) {
    try {
      const room = await Room.findOrFail(params.id)
      await room.delete()
      return response.status(204).send(room)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Sala não encontrada', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao deletar sala', error: error.message })
    }
  }

  public async userRooms({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      const allocations = await Allocation.query().where('user_id', user.id).preload('room')
      const rooms = allocations.map(allocation => allocation.room.room_number)

      return response.status(200).json({
        userName: user.name,
        rooms
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Usuário não encontrado', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao recuperar salas do usuário', error: error.message })
    }
  }
}