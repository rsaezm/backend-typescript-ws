import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let InsufficientStorageException = class extends HttpException {
	constructor(message: string = 'Insufficient Storage', additionalInfo: any = {}) {
		super(message, HttpStatus.INSUFFICIENT_STORAGE, additionalInfo)
	}
}
