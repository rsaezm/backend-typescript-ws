import bcrypt from 'bcryptjs'
import EventEmitter from "events"
import { DateTime } from 'luxon'
import { injectable } from 'tsyringe'
import { WebsocketService } from '../../../core'
import { type IUsuario, UsuarioRepository } from '../../../repository'
import { type IUsuarioEntity, UsuarioEvents } from '../../interfaces'
import { UsuarioMapping } from '../../mapping'

@injectable<UsuarioService>()
export class UsuarioService extends EventEmitter {
	constructor(private websocketService: WebsocketService) { super() }

	public async GetAll(): Promise<IUsuario[]> {
		return await UsuarioRepository.find()
	}

	public async GetById(id: string): Promise<IUsuario> {
		const usuario: IUsuario = await UsuarioRepository.findById<IUsuario>(id)

		this.websocketService.EmitToAll('GetById', usuario)

		return usuario
	}

	public async Crear(entity: IUsuarioEntity): Promise<void> {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(entity.Password, salt)

		const item: IUsuario = await UsuarioRepository.create(
			{
				...entity,
				Autenticacion: {
					Password: {
						Password: hash,
						FechaActualizacion: DateTime.now().toBSON(),
						FechaVigencia: DateTime.now().plus({ days: 180 }).toBSON()
					}
				}
			}
		)

		this.emit(UsuarioEvents.Crear, item)

		this.websocketService.EmitToAll(UsuarioEvents.Crear, await UsuarioMapping.RepositoryToType(item))
	}

	public async Actualizar(id: string, entity: IUsuarioEntity): Promise<void> {
		const item: IUsuario = await UsuarioRepository.findByIdAndUpdate(id, entity, { new: true })

		this.emit(UsuarioEvents.Actualizar, item)

		this.websocketService.EmitToAll(UsuarioEvents.Actualizar, await UsuarioMapping.RepositoryToType(item))
	}

	public async Eliminar(id: string): Promise<void> {
		const item: IUsuario = await UsuarioRepository.findByIdAndDelete(id, { new: true })

		this.emit(UsuarioEvents.Eliminar, item)

		this.websocketService.EmitToAll(UsuarioEvents.Eliminar, await UsuarioMapping.RepositoryToType(item))
	}
}