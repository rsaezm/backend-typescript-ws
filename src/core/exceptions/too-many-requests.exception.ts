import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let TooManyRequestsException = class extends HttpException {
	constructor(message: string = 'Too Many Requests', additionalInfo: any = {}) {
		super(message, HttpStatus.TOO_MANY_REQUESTS, additionalInfo)
	}
}
