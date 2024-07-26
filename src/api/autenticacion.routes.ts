import { NextFunction, Request, Response, Router } from 'express'
import { AutenticacionService, ILoginEntity, IUsuarioEntity, UsuarioService } from '../dominio'
import { inject, injectable } from 'tsyringe'
import { ValidateClass } from '../core/middlewares'
import { LoginEntity } from '../dominio/classes/membresia/autenticacion.entity'
import { AutenticacionMapping } from '../dominio/mapping'

@injectable<AutenticacionRoutes>() export class AutenticacionRoutes {
	public routes = Router()

	constructor(@inject(AutenticacionService) private autenticacionService: AutenticacionService) {
		this.routes.post('/login', ValidateClass(LoginEntity), async (req: Request, res: Response, next: NextFunction) => {
			try { res.status(200).json(await AutenticacionMapping.RepositoryToType(await this.autenticacionService.Login(req.body as ILoginEntity))) }
			catch (error) { next(error) }
		})
	}
}