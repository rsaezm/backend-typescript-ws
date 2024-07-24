import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let RequestTimeoutException = class extends HttpException {
	constructor(message: string = 'Request Timeout', additionalInfo: any = {}) {
		super(message, HttpStatus.REQUEST_TIMEOUT, additionalInfo)
	}
}
