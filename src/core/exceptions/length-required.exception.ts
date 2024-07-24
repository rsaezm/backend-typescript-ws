import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let LengthRequiredException = class extends HttpException {
	constructor(message: string = 'Length Required', additionalInfo: any = {}) {
		super(message, HttpStatus.LENGTH_REQUIRED, additionalInfo)
	}
}
