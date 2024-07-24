import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let RequestHeaderFieldsTooLargeException = class extends HttpException {
	constructor(message: string = 'Request Header Fields Too Large', additionalInfo: any = {}) {
		super(message, HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, additionalInfo)
	}
}
