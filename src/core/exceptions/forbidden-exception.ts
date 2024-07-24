import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let ForbiddenException = class extends HttpException {
	constructor(message: string = 'FORBIDDEN', additionalInfo: any = {}) {
		super(message, HttpStatus.FORBIDDEN, additionalInfo)
	}
}
