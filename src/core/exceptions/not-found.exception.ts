import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let NotFoundException = class extends HttpException {
	constructor(message: string = 'Not Found', additionalInfo: any = {}) {
		super(message, HttpStatus.NOT_FOUND, additionalInfo)
	}
}
