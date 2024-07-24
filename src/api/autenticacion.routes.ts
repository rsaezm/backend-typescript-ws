import { NextFunction, Request, Response, Router } from 'express'
import { IUsuarioEntity, UsuarioService } from '../dominio'
import { inject, injectable } from 'tsyringe'

@injectable<AutenticacionRoutes>()
export class AutenticacionRoutes {
	public routes = Router()

	constructor(
		@inject('UsuarioService') private usuarioService: UsuarioService
	) {
		this.routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
			res.status(200).json(await this.usuarioService.GetAll())
		})

		this.routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
			res.status(200).json(await this.usuarioService.GetById(req.params.id))
		})

		this.routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
			res.status(200).json(await this.usuarioService.Crear(req.body as IUsuarioEntity))
		})
	}
}