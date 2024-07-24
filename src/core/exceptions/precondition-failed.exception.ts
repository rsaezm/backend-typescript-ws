import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let PreconditionFailedException = class extends HttpException {
	constructor(message: string = 'Precondition Failed', additionalInfo: any = {}) {
		super(message, HttpStatus.PRECONDITION_FAILED, additionalInfo)
	}
}
