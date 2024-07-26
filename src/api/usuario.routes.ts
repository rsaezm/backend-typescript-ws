import { NextFunction, Request, Response, Router } from 'express'
import { IUsuarioEntity, UsuarioService } from '../dominio'
import { inject, injectable } from 'tsyringe'
import { ValidateClass } from '../core/middlewares'
import { UsuarioEntity } from '../dominio/classes/membresia/usuario.entity'
import { UsuarioMapping } from '../dominio/mapping'

@injectable<UsuarioRoutes>() export class UsuarioRoutes {
	public routes = Router()

	constructor(@inject(UsuarioService) private usuarioService: UsuarioService) {

		this.routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await Promise.all((await this.usuarioService.GetAll()).map(UsuarioMapping.RepositoryToType))) }
			catch (error) { next(error) }
		})

		this.routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await UsuarioMapping.RepositoryToType(await this.usuarioService.GetById(req.params.id))) }
			catch (error) { next(error) }
		})

		this.routes.post('/', ValidateClass(UsuarioEntity), async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await this.usuarioService.Crear(req.body as IUsuarioEntity)) }
			catch (error) { next(error) }
		})

		this.routes.patch('/:id', ValidateClass(UsuarioEntity, true), async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await this.usuarioService.Actualizar(req.params.id, req.body as IUsuarioEntity)) }
			catch (error) { next(error) }
		})

		this.routes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await this.usuarioService.Eliminar(req.params.id)) }
			catch (error) { next(error) }
		})
	}
}