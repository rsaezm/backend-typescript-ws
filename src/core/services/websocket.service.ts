import { IncomingMessage } from 'http'
import { inject, singleton } from 'tsyringe'
import { WebSocket } from 'ws'
import { IUsuario, UsuarioRepository } from '../../repository'
import { CryptService } from './crypt.service'
import { privateDecrypt } from 'crypto'
import { AutenticacionService, UsuarioService } from '../../dominio'

interface Dictionary<T> {
	[Key: string]: T
}

@singleton<WebsocketService>()
export class WebsocketService {
	private static sockets: Dictionary<WebSocket> = {};

	constructor(
		@inject('CryptService') private cryptService: CryptService,
	) { }

	public OnListening = () => {
		// console.log('WebsocketService.OnListening')
	}

	public OnHeaders = (headers: string[], request: IncomingMessage) => {
		// console.log('WebsocketService.OnHeaders')//, { headers, request }
	}

	public OnConnection = async (websocket: WebSocket, request: IncomingMessage) => {
		if (!request.headers.authorization) {
			websocket.close(3000, 'Endpoint must be authorized to perform application-based request')
			return
		}

		const payload: { payload: string } = await this.cryptService.DecodeToken<{ payload: string }>(request.headers.authorization)

		if (!(await UsuarioRepository.findById(payload.payload))) {
			websocket.close(3003, 'Endpoint is authorized but has no permissions to perform application-based request')
			return
		}

		// console.log('WebsocketService.OnConnection')//, { websocket, request }
		WebsocketService.sockets[payload.payload] = websocket

		websocket.on('open', (args: any[]) => {
			// console.log('WebsocketService.OnConnection.open')//, args
		})
		websocket.on('message', (message: IncomingMessage) => {
			// console.log('WebsocketService.OnConnection.message')//, message.toString()
		})
		websocket.on('upgrade', (args: any[]) => {
			// console.log('WebsocketService.OnConnection.upgrade')//, args
		})
		websocket.on('ping', (args: any[]) => {
			// console.log('WebsocketService.OnConnection.ping')//, args
		})
		websocket.on('pong', (args: any[]) => {
			// console.log('WebsocketService.OnConnection.pong')//, args
		})
		websocket.on('unexpected-response', (args: any[]) => {
			// console.log('WebsocketService.OnConnection.unexpected-response')//, args
		})
		websocket.on('error', (args: any[]) => {
			console.log('WebsocketService.OnConnection.error')//, args
		})
		websocket.on('close', async (closeCode: number, closeMessage: IncomingMessage) => {
			switch (closeCode) {
				case 1000: {
					const payload: { payload: string } = await this.cryptService.DecodeToken<{ payload: string }>(request.headers.authorization)
					delete WebsocketService.sockets[payload.payload]
					break
				}
				default: {
					// console.log('WebsocketService.OnConnection.close', { closeCode, closeMessage })//, { closeCode, closeMessage: closeMessage.toString() }
				}
			}
		})
	}

	public OnError = (websocket: WebSocket, args: any[]) => {
		// console.log('WebsocketService.OnError')//, { websocket, args }
	}

	public OnClose = (args: any[]) => {
		// console.log('WebsocketService.OnClose')//, { args }
	}

	public EmitToAll<T>(action: string, payload: T): T {
		for (let key in WebsocketService.sockets)
			WebsocketService.sockets[key].send(JSON.stringify({ action, payload }))

		return payload
	}

	public EmitToUsuario<T>(usaurio: IUsuario, action: string, payload: T): T {
		return payload
	}
}