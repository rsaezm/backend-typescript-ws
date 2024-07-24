import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let NotAcceptableException = class extends HttpException {
	constructor(message: string = 'Not Acceptable', additionalInfo: any = {}) {
		super(message, HttpStatus.NOT_ACCEPTABLE, additionalInfo)
	}
}
