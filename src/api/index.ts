import { Router } from 'express'
import "reflect-metadata"
import { inject, injectable } from 'tsyringe'
import { AutenticacionRoutes } from './autenticacion.routes'
import { UsuarioRoutes } from './usuario.routes'

@injectable<ApiRoutes>() export class ApiRoutes {
	public routes = Router()

	constructor(
		@inject(AutenticacionRoutes) private autenticacionRoutes: AutenticacionRoutes,
		@inject(UsuarioRoutes) private usuarioRoutes: UsuarioRoutes,
	) {
		this.routes.use('/autenticacion', this.autenticacionRoutes.routes)
		this.routes.use('/usuario', this.usuarioRoutes.routes)
	}
}