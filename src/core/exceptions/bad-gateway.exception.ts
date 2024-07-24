import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let BadGatewayException = class extends HttpException {
	constructor(message: string = 'Bad Gateway', additionalInfo: any = {}) {
		super(message, HttpStatus.BAD_GATEWAY, additionalInfo)
	}
}
