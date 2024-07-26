import cors, { CorsOptions } from 'cors'
import express, { Application, NextFunction, Request } from 'express'
import http, { Server as HttpServer } from 'http'
import { Settings } from 'luxon'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'reflect-metadata'
import { Server as ServerIo, Socket } from 'socket.io'
import { container, Lifecycle } from 'tsyringe'
import { ApiRoutes } from './api'
import { AutenticacionRoutes } from './api/autenticacion.routes'
import { UsuarioRoutes } from './api/usuario.routes'
import { NotFoundException, WebsocketService } from './core'
import { ErrorMiddleware } from './core/middlewares'

//	Initialize Parameters
Settings.defaultZone = "America/Santiago"
Settings.defaultLocale = "es-CL"
const corsOptions: CorsOptions = { origin: process.env.FRONTEND_URL }

{	//	Database
	mongoose.connection.on('error', error => {
		console.error('connection error', error)
		process.exit(0)
	})

	mongoose.connection.on('open', async () => {
		console.log(`MongoDB connection stablished (${process.env.NODE_ENV})`)
	})

	mongoose.connect(process.env.MONGODB_URL ?? '')
}

const app: Application = express()
const httpServer: HttpServer = http.createServer(app)
{
	app.use(cors(corsOptions))
	app.use(express.json({ limit: '100mb' }))
	app.use(express.urlencoded({ extended: true, limit: '100mb' }))
	app.use(morgan('tiny'))

	container.register('ApiRoutes', { useClass: ApiRoutes }, { lifecycle: Lifecycle.Singleton })
	container.register('AutenticacionRoutes', { useClass: AutenticacionRoutes }, { lifecycle: Lifecycle.Singleton })
	container.register('UsuarioRoutes', { useClass: UsuarioRoutes }, { lifecycle: Lifecycle.Singleton })

	const apiRoutes = container.resolve(ApiRoutes)
	app.use('/api', apiRoutes.routes)
	app.all('/*', (req: express.Request, res: express.Response, next: express.NextFunction) => next(new NotFoundException('No se ha encontrado el recurso solicitado')))
	app.use(ErrorMiddleware)

	httpServer.on('listening', () => console.log('httpServer.OnListening'))
	httpServer.on('connection', (socket: any) => console.log('httpServer.OnConnection'))
	httpServer.on('request', (req: Request, res: Response) => console.log('httpServer.OnRequest'))
}

{	//	Websocket
	const io = new ServerIo(httpServer, { cors: corsOptions })

	const websocketService: WebsocketService = container.resolve(WebsocketService)
	io.on('connect', websocketService.OnConnect)
}

const server = httpServer.listen(+process.env.BACKEND_API_PORT || 6300)