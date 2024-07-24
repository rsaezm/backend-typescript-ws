import { container, Lifecycle } from 'tsyringe'
import { WebsocketService } from './websocket.service'

container.register('WebsocketService', { useClass: WebsocketService }, { lifecycle: Lifecycle.Singleton })

export { WebsocketService }
