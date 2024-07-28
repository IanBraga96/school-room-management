import { BaseSeeder } from '@adonisjs/lucid/seeders'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class AdminSeeder extends BaseSeeder {
  async run () {
    // Deletar admins já criados na tabela
     await User.query().where('is_admin', 1).delete()

    await User.create({
      name: 'Administrador',
      email: 'admin@admin.com',
      password: await hash.make('senha'),
      birthDate: DateTime.fromISO('1990-01-01'),
      registration_number: '123456',
      is_admin: true,
    })
  }
}