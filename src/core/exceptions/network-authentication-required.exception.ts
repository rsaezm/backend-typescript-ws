import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let NetworkAuthenticationRequiredException = class extends HttpException {
	constructor(message: string = 'Network Authentication Required', additionalInfo: any = {}) {
		super(message, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, additionalInfo)
	}
}
