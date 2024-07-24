import { IUsuario } from '../../../repository'
import { ILoginType, IUsuarioType } from '../../interfaces'

export class AutenticacionMapping {
	public static async RepositoryToType(arg: string): Promise<ILoginType> {
		if (!arg) return undefined

		return {
			Token: arg
		}
	}
}