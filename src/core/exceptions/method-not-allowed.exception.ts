import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let MethodNotAllowedException = class extends HttpException {
	constructor(message: string = 'Method Not Allowed', additionalInfo: any = {}) {
		super(message, HttpStatus.METHOD_NOT_ALLOWED, additionalInfo)
	}
}
