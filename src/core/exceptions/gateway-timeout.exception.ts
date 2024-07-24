import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let GatewayTimeoutException = class extends HttpException {
	constructor(message: string = 'Gateway Timeout', additionalInfo: any = {}) {
		super(message, HttpStatus.GATEWAY_TIMEOUT, additionalInfo)
	}
}
