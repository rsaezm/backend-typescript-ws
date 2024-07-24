import "reflect-metadata"
import { NextFunction, Router } from 'express'
import { AutenticacionRoutes } from './autenticacion.routes'
import { inject, injectable } from 'tsyringe'
import { container } from 'tsyringe'

@injectable<ApiRoutes>()
export class ApiRoutes {
	public routes = Router()

	constructor(
		@inject('AutenticacionRoutes') private autenticacionRoutes: AutenticacionRoutes
	) {
		this.routes.use('/autenticacion', this.autenticacionRoutes.routes)
	}
}