import { Socket } from 'socket.io'
import { container, inject, injectable, singleton } from 'tsyringe'
import { IUsuario, UsuarioRepository } from '../../repository'
import { CryptService } from './crypt.service'

interface Dictionary<T> {
	[Key: string]: T
}

@singleton<WebsocketService>() export class WebsocketService {
	private static sockets: Socket[] = [];
	private static usuarios: Dictionary<Socket[]> = {}
	private static sesiones: Dictionary<Socket[]> = {}

	public async OnConnect(socket: Socket) {

		socket.on('connect', () => {
			console.log('WebsocketService.OnConnect.connect')
		})

		socket.on('disconnect', (reason) => {
			console.log('WebsocketService.OnConnect.disconnect')
			console.log(`Desconectado del servidor: ${reason}`)
		})

		socket.on('connect_error', (error) => {
			console.log('WebsocketService.OnConnect.connect_error')
			console.error(`Error de conexión: ${error.message}`)
		})

		socket.on('connect_timeout', () => {
			console.log('WebsocketService.OnConnect.connect_timeout')
			console.warn('Tiempo de conexión excedido')
		})

		socket.on('reconnect', (attemptNumber) => {
			console.log('WebsocketService.OnConnect.reconnect')
			console.log(`Reconectado al servidor en el intento ${attemptNumber}`)
		})

		socket.on('reconnect_attempt', () => {
			console.log('WebsocketService.OnConnect.reconnect_attempt')
			console.log('Intentando reconectar...')
		})

		socket.on('reconnecting', (attemptNumber) => {
			console.log('WebsocketService.OnConnect.reconnecting')
			console.log(`Intentando reconectar (${attemptNumber})`)
		})

		socket.on('reconnect_error', (error) => {
			console.log('WebsocketService.OnConnect.reconnect_error')
			console.error(`Error al intentar reconectar: ${error.message}`)
		})

		socket.on('reconnect_failed', () => {
			console.log('WebsocketService.OnConnect.reconnect_failed')
			console.error('No se pudo reconectar al servidor')
		})

		socket.on('error', (error) => {
			console.log('WebsocketService.OnConnect.error')
			console.error(`Error: ${error.message}`)
		})

		socket.onAny((a: any, b: any[]) => {
			console.log('WebsocketService.OnConnect.onAny', { a, b })
		})

		socket.on('upgrade', () => {
			console.log('WebsocketService.OnConnect.upgrade')
		})

		socket.on('close', () => {
			console.log('WebsocketService.OnConnect.close')
		})

		socket.on("disconnecting", () => {
			WebsocketService.sockets.splice(WebsocketService.sockets.findIndex(s => s.id == socket.id), 1)
			for (let usuarioId in WebsocketService.usuarios) {
				const indice = WebsocketService.usuarios[usuarioId].findIndex(s => s.id == socket.id)
				if (indice != -1) {
					WebsocketService.usuarios[usuarioId].splice(indice, 1)
					if (WebsocketService.usuarios[usuarioId].length == 0) delete WebsocketService.usuarios[usuarioId]
				}
			}

			console.log('WebsocketService.OnConnect.disconnecting')
		})

		const token: string = socket.handshake.headers.authorization

		if (!token) {
			socket.disconnect()
			return
		};

		const payload = await CryptService.DecodeToken<{ id: string }>(token)

		const usuario: IUsuario = await UsuarioRepository.findById(payload.id)

		WebsocketService.sockets.push(socket);

		(WebsocketService.usuarios[usuario._id])
			? WebsocketService.usuarios[usuario._id.valueOf()].push(socket)
			: WebsocketService.usuarios[usuario._id.valueOf()] = [socket]
	}

	public EmitToAll<T>(action: string, payload: T): T {
		WebsocketService.sockets?.forEach(s => s.emit(action, payload))

		return payload
	}

	public EmitToUsuario<T>(usaurio: IUsuario, action: string, payload: T): T {
		WebsocketService.usuarios[usaurio._id]?.forEach(s => s.emit(JSON.stringify({ action, payload })))

		return payload
	}




	// 	public OnCheckContinue(req: Request, res: Response) {
	// 	console.log('WebsocketService.OnCheckContinue')
	// }
	// 	public OnCheckExpectation(req: Request, res: Response) {
	// 	console.log('WebsocketService.OnCheckExpectation')
	// }
	// 	public OnClientError(err: Error, socket: Duplex) {
	// 	console.log('WebsocketService.OnClientError')
	// }
	// 	public OnDropRequest(req: Request, socket: Duplex) {
	// 	console.log('WebsocketService.OnDropRequest')
	// }
	// 	public OnUpgrade(req: IncomingMessage, socket: Duplex, head: Buffer) {
	// 	console.log('WebsocketService.OnUpgrade',
	// 		{
	// 			//req,
	// 			// socket,
	// 			// head
	// 		})
	// }
	// 	public OnError(err: Error) {
	// 	console.log('WebsocketService.OnError')
	// }
	// 	public OnClose() {
	// 	console.log('WebsocketService.OnClose')
	// }



	// public OnListening = () => {
	// 	// console.log('WebsocketService.OnListening')
	// }

	// public OnHeaders = (headers: string[], request: IncomingMessage) => {
	// 	// console.log('WebsocketService.OnHeaders')//, { headers, request }
	// }

	// public OnConnection = async (websocket: WebSocket, request: IncomingMessage) => {
	// 	if (!request.headers.authorization) {
	// 		websocket.close(3000, 'Endpoint must be authorized to perform application-based request')
	// 		return
	// 	}

	// 	const payload: { payload: string } = await this.cryptService.DecodeToken<{ payload: string }>(request.headers.authorization)

	// 	if (!(await UsuarioRepository.findById(payload.payload))) {
	// 		websocket.close(3003, 'Endpoint is authorized but has no permissions to perform application-based request')
	// 		return
	// 	}

	// 	// console.log('WebsocketService.OnConnection')//, { websocket, request }
	// 	WebsocketService.sockets[payload.payload] = websocket

	// 	websocket.on('open', (args: any[]) => {
	// 		// console.log('WebsocketService.OnConnection.open')//, args
	// 	})
	// 	websocket.on('message', (message: IncomingMessage) => {
	// 		// console.log('WebsocketService.OnConnection.message')//, message.toString()
	// 	})
	// 	websocket.on('upgrade', (args: any[]) => {
	// 		// console.log('WebsocketService.OnConnection.upgrade')//, args
	// 	})
	// 	websocket.on('ping', (args: any[]) => {
	// 		// console.log('WebsocketService.OnConnection.ping')//, args
	// 	})
	// 	websocket.on('pong', (args: any[]) => {
	// 		// console.log('WebsocketService.OnConnection.pong')//, args
	// 	})
	// 	websocket.on('unexpected-response', (args: any[]) => {
	// 		// console.log('WebsocketService.OnConnection.unexpected-response')//, args
	// 	})
	// 	websocket.on('error', (args: any[]) => {
	// 		console.log('WebsocketService.OnConnection.error')//, args
	// 	})
	// 	websocket.on('close', async (closeCode: number, closeMessage: IncomingMessage) => {
	// 		switch (closeCode) {
	// 			case 1000: {
	// 				const payload: { payload: string } = await this.cryptService.DecodeToken<{ payload: string }>(request.headers.authorization)
	// 				delete WebsocketService.sockets[payload.payload]
	// 				break
	// 			}
	// 			default: {
	// 				// console.log('WebsocketService.OnConnection.close', { closeCode, closeMessage })//, { closeCode, closeMessage: closeMessage.toString() }
	// 			}
	// 		}
	// 	})
	// }

	// public OnError = (websocket: WebSocket, args: any[]) => {
	// 	// console.log('WebsocketService.OnError')//, { websocket, args }
	// }

	// public OnClose = (args: any[]) => {
	// 	// console.log('WebsocketService.OnClose')//, { args }
	// }
}