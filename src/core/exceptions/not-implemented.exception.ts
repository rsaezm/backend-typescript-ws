import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let NotImplementedException = class extends HttpException {
	constructor(message: string = 'Not Implemented', additionalInfo: any = {}) {
		super(message, HttpStatus.NOT_IMPLEMENTED, additionalInfo)
	}
}
