import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Room from '#models/room'
import Allocation from '#models/allocation'

export default class AllocationsController {
  public async allocate({ request, response }: HttpContext) {
    try {
      const { roomId, userId } = request.only(['roomId', 'userId'])
  
      const room = await Room.findOrFail(roomId)
      const user = await User.findOrFail(userId)
  
      const existingAllocation = await Allocation.query()
        .where('room_id', roomId)
        .andWhere('user_id', userId)
        .first()
  
      if (existingAllocation) {
        return response.status(400).json({ message: 'Usuário já está alocado nesta sala' })
      }
  
      const currentAllocations = await Allocation.query().where('room_id', roomId).count('* as total')
      const allocationCount = currentAllocations[0].$extras.total
  
      if (allocationCount >= room.capacity) {
        return response.status(400).json({ message: 'Capacidade da sala excedida' })
      }
  
      await Allocation.create({ room_id: roomId, user_id: userId })
  
      return response.status(201).json({ message: 'Usuário alocado com sucesso' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Sala ou usuário não encontrado', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao alocar usuário', error: error.message })
    }
  }

  public async deallocate({ request, response }: HttpContext) {
    try {
      const { roomId, userId } = request.only(['roomId', 'userId'])

      const allocation = await Allocation.query()
        .where('room_id', roomId)
        .andWhere('user_id', userId)
        .firstOrFail()

      await allocation.delete()

      return response.status(200).send({ message: 'Usuário removido da sala com sucesso' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Alocação não encontrada', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao desalocar usuário', error: error.message })
    }
  }

  public async userRooms({ params, response }: HttpContext) {
    const userId = params.id
  
    try {
      const user = await User.findOrFail(userId)
  
      await user.load('rooms')
  
      const rooms = user.rooms.map(room => ({
        room_number: room.room_number,
        capacity: room.capacity,
      }))
  
      return response.status(200).send(rooms)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({ message: 'Usuário não encontrado', error: error.message })
      }
      console.error(error)
      return response.status(500).json({ message: 'Erro ao recuperar salas do usuário', error: error.message })
    }
  }
}
