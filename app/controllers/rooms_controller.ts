import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'

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
      return response.status(201).json(room)
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
}