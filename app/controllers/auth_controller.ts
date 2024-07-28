import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'


export default class AuthController {
    public async login({ request, response }: HttpContext) {
      const { email, password } = request.only(['email', 'password'])
  
      try {
        console.log('Iniciando processo de login')
  
        // Encontrar o usuário pelo email
        const user = await User.findByOrFail('email', email)
  
        // Verificar a senha
        const isPasswordValid = await hash.verify(user.password, password)
  
        if (!isPasswordValid) {
          console.log('Senha inválida')
          return response.unauthorized('Credenciais inválidas')
        }
  
        // Gerar um token de autenticação
        const token = await User.accessTokens.create(user)
  
        console.log('Token gerado:', token)
        return response.ok({ token: token })
      } catch (error) {
        console.log('Erro durante o login:', error)
        return response.unauthorized('Credenciais inválidas')
      }
    }
}
