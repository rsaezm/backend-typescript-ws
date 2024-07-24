import { IUsuario } from '../../../repository'
import { IUsuarioType } from '../../interfaces'

export class UsuarioMapping {
	public static async RepositoryToType(arg: IUsuario): Promise<IUsuarioType> {
		if (!arg) return undefined

		return {
			Id: arg._id,
			CorreoElectronico: arg.CorreoElectronico,
			Username: arg.Username,
		}
	}
}