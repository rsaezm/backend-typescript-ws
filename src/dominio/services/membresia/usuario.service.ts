// import "reflect-metadata"
import bcrypt from 'bcryptjs'
import { DateTime } from 'luxon'
import { inject, injectable } from 'tsyringe'
import { type IUsuario, UsuarioRepository } from '../../../repository'
import { type IUsuarioEntity, UsuarioEvents } from '../../interfaces'
import EventEmitter = require('events')
import { WebsocketService } from '../../../core'

@injectable<UsuarioService>()
export class UsuarioService extends EventEmitter {

	constructor(private websocketService: WebsocketService) {
		super()
	}

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

		this.emit(
			UsuarioEvents.Create,
			await UsuarioRepository.create(
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
		)
	}
}