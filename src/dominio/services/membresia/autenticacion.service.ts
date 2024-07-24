import EventEmitter from "events"
import { injectable } from 'tsyringe'
import { CryptService, NotAcceptableException } from '../../../core'
import { IUsuario, UsuarioRepository } from '../../../repository'
import { ILoginEntity } from '../../interfaces'

@injectable<AutenticacionService>()
export class AutenticacionService extends EventEmitter {
	constructor(
		private cryptService: CryptService
	) { super() }

	public async Login(entity: ILoginEntity): Promise<string> {
		const usuario: IUsuario = await UsuarioRepository.findOne({ CorreoElectronico: entity.CorreoElectronico })

		if (!usuario)
			throw new NotAcceptableException('Nombre de usuario o contraseña incorrectos')

		if (!(await this.cryptService.ComparePassword(entity.Password, usuario.Autenticacion.Password.Password)))
			throw new NotAcceptableException('Nombre de usuario o contraseña incorrectos')


		// TODO:	Generar sesión y persistirla en base de datos

		const secretToken = await this.cryptService.GenerateAccessToken(usuario._id.valueOf(), true)

		return secretToken
	}
}