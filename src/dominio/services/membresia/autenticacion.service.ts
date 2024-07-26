import EventEmitter from "events"
import { inject, injectable } from 'tsyringe'
import { CryptService, NotAcceptableException } from '../../../core'
import { IUsuario, UsuarioRepository } from '../../../repository'
import { ILoginEntity } from '../../interfaces'

@injectable<AutenticacionService>() export class AutenticacionService extends EventEmitter {
	constructor() { super() }

	public async Login(entity: ILoginEntity): Promise<string> {
		const usuario: IUsuario = await UsuarioRepository.findOne({ CorreoElectronico: entity.CorreoElectronico })

		if (!usuario)
			throw new NotAcceptableException('Nombre de usuario o contraseña incorrectos')

		if (!(await CryptService.ComparePassword(entity.Password, usuario.Autenticacion.Password.Password)))
			throw new NotAcceptableException('Nombre de usuario o contraseña incorrectos')

		// TODO:	Generar sesión y persistirla en base de datos

		const secretToken: string = await CryptService.GenerateAccessToken<{ id: string }>({ id: usuario._id }, true)

		return secretToken
	}
}