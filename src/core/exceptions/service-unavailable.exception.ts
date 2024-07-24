import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let ServiceUnavailableException = class extends HttpException {
	constructor(message: string = 'Service Unavailable', additionalInfo: any = {}) {
		super(message, HttpStatus.SERVICE_UNAVAILABLE, additionalInfo)
	}
}
