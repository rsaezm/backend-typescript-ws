import { container } from 'tsyringe'
import { UsuarioService } from './usuario.service'

container.register('UsuarioService', { useClass: UsuarioService })

export {
	UsuarioService
}