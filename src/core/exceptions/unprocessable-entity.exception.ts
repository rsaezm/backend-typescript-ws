import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let UnprocessableEntityException = class extends HttpException {
	constructor(message: string = 'Unprocessable Entity', additionalInfo: any = {}) {
		super(message, HttpStatus.UNPROCESSABLE_ENTITY, additionalInfo)
	}
}
