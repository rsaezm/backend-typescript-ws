import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let GoneException = class extends HttpException {
	constructor(message: string = 'Gone', additionalInfo: any = {}) {
		super(message, HttpStatus.GONE, additionalInfo)
	}
}
