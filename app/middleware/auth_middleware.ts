import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      // Autenticar o usuário
      await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
      
      // Buscar o usuário autenticado
      const user = ctx.auth.user!

      // Verificar se o usuário é admin
      if (!user.is_admin) {
        return ctx.response.unauthorized({ message: 'Você não tem permissão para acessar esta área.' })
      }

      // Passar para o próximo middleware/controller
      await next()
    } catch {
      return ctx.response.unauthorized({ message: 'Você precisa estar autenticado para acessar esta área.' })
    }
  }
}