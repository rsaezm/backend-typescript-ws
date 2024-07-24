import { NextFunction, Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'
import { HttpException } from '../exceptions'

export let ErrorMiddleware = function (error: Error, req: Request, res: Response, next: NextFunction) {
	if (error instanceof HttpException) {
		res.status(error.status).json(error)
	} else {
		res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Ups!, se ha producido un error al procesar su solicitud.',
			additionalInfo: error,
		})
	}
}
