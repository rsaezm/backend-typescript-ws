import express, { Application } from 'express'
import http, { IncomingMessage, RequestListener, Server } from "http"
import mongoose from 'mongoose'
import { Socket } from 'net'
import "reflect-metadata"
import { Duplex } from 'stream'
import { container, Lifecycle } from 'tsyringe'
import WebSocket from 'ws'
import { ApiRoutes } from './api'
import { AutenticacionRoutes } from './api/autenticacion.routes'
import { WebsocketService } from './core'

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
{
	app.use(express.json({ limit: '100mb' }))
	app.use(express.urlencoded({ extended: true, limit: '100mb' }))
	container.register('ApiRoutes', { useClass: ApiRoutes }, { lifecycle: Lifecycle.Singleton })
	container.register('AutenticacionRoutes', { useClass: AutenticacionRoutes }, { lifecycle: Lifecycle.Singleton })
	const apiRoutes = container.resolve(ApiRoutes)
	app.use('/api', apiRoutes.routes)
}

const httpServer: Server = http.createServer(app)
{
	// on(event: "close", listener: () => void): this;
	httpServer.on('close', () => {
		// console.log('close')
	})

	// on(event: "connection", listener: (socket: Socket) => void): this;
	httpServer.on('connection', (socket: Socket) => {
		// console.log('connection')//, socket
	})

	// on(event: "error", listener: (err: Error) => void): this;
	httpServer.on('error', (err: Error) => {
		// console.log(err)
		// if (err.code === 'EADDRINUSE')
		// 	console.error('Error: address already in use')
		// else
		// console.error('server error: ', err)
	})

	// on(event: "checkContinue", listener: RequestListener<Request, Response>): this;
	httpServer.on('checkContinue', (listener: RequestListener) => {
		// console.log('checkContinue')//, listener
	})

	// on(event: "checkExpectation", listener: RequestListener<Request, Response>): this;
	httpServer.on('checkExpectation', (listener: RequestListener) => {
		// console.log('checkExpectation')//, listener
	})

	// on(event: "clientError", listener: (err: Error, socket: stream.Duplex) => void): this;
	httpServer.on('clientError', (err: Error, socket: Duplex) => {
		// console.log('clientError')//, err socket)
	})

	// on(event: "connect", listener: (req: InstanceType<Request>, socket: stream.Duplex, head: Buffer) => void): this;
	httpServer.on('connect', (req: any, socket: Duplex, head: Buffer) => {
		// console.log('connect')//, req socket, head
	})

	// on(event: "dropRequest", listener: (req: InstanceType<Request>, socket: stream.Duplex) => void): this;
	httpServer.on('dropRequest', (args: any[]) => {
		// console.log('dropRequest')//, args
	})

	// on(event: "listening", listener: () => void): this;
	httpServer.on('listening', (args: any[]) => {
		// console.log('listening')//, args
	})

	// on(event: "request", listener: RequestListener<Request, Response>): this;
	httpServer.on('request', (args: any[]) => {
		// console.log('request')//, args
	})

	// on(event: "upgrade", listener: (req: InstanceType<Request>, socket: stream.Duplex, head: Buffer) => void): this;
	httpServer.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
		// if (!req.headers.authorization) {
		// 	socket.end('HTTP/1.1 400 Bad Request')
		// 	return
		// }
		// console.log('upgrade')//, socket, head
	})

}

const wss = new WebSocket.Server({ server: httpServer })
{	//	Websocket
	const websocketService: WebsocketService = container.resolve(WebsocketService)

	wss.on('listening', websocketService.OnListening)
	wss.on('headers', websocketService.OnHeaders)
	wss.on('connection', websocketService.OnConnection)
	wss.on('error', websocketService.OnError)
	wss.on('close', websocketService.OnClose)
}

const server = httpServer.listen(+process.env.BACKEND_API_PORT || 6300)