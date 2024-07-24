import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let InternalServerErrorException = class extends HttpException {
	constructor(message: string = 'Ups!, se ha producido un error al procesar su solicitud', additionalInfo: any = {}) {
		super(message, HttpStatus.INTERNAL_SERVER_ERROR, additionalInfo)
	}
}
