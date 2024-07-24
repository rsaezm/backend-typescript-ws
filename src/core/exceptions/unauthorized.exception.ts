import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let UnauthorizedException = class extends HttpException {
	constructor(message: string = 'Unauthorized', additionalInfo: any = {}) {
		super(message, HttpStatus.UNAUTHORIZED, additionalInfo)
	}
}
