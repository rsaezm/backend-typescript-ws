import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let UnsupportedMediaTypeException = class extends HttpException {
	constructor(message: string = 'Unsupported Media Type', additionalInfo: any = {}) {
		super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE, additionalInfo)
	}
}
