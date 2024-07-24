import { container } from 'tsyringe'
import { UsuarioService } from './usuario.service'
import { AutenticacionService } from './autenticacion.service'

container.register('AutenticacionService', { useClass: AutenticacionService })
container.register('UsuarioService', { useClass: UsuarioService })

export {
	AutenticacionService,
	UsuarioService
}