import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let LockedException = class extends HttpException {
	constructor(message: string = 'Locked', additionalInfo: any = {}) {
		super(message, HttpStatus.LOCKED, additionalInfo)
	}
}
