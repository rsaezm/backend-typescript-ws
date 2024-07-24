import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let BadRequestException = class extends HttpException {
	constructor(message: string = 'Bad Request', additionalInfo: any = {}) {
		super(message, HttpStatus.BAD_REQUEST, additionalInfo)
	}
}
