import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let ConflictException = class extends HttpException {
	constructor(message: string = 'Conflict', additionalInfo: any = {}) {
		super(message, HttpStatus.CONFLICT, additionalInfo)
	}
}
