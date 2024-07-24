import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let HttpVersionNotSupportedException = class extends HttpException {
	constructor(message: string = 'HTTP Version Not Supported', additionalInfo: any = {}) {
		super(message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED, additionalInfo)
	}
}
