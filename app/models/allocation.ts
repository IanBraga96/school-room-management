import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from './room.js'

export default class Allocation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare room_id: number

  @column()
  declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Room, {
    foreignKey: 'room_id', // Nome da coluna foreign key no Allocation
  })
  declare room: BelongsTo<typeof Room>

  
}