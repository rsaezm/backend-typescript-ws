import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let PreconditionRequiredException = class extends HttpException {
	constructor(message: string = 'Precondition Required', additionalInfo: any = {}) {
		super(message, HttpStatus.PRECONDITION_REQUIRED, additionalInfo)
	}
}
