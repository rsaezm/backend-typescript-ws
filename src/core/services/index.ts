import { container, Lifecycle } from 'tsyringe'
import { CryptService } from './crypt.service'
import { WebsocketService } from './websocket.service'

// container.register(CryptService, { useClass: CryptService }, { lifecycle: Lifecycle.Singleton })
container.register(WebsocketService, { useClass: WebsocketService }, { lifecycle: Lifecycle.Singleton })

export {
	CryptService,
	WebsocketService
}
