import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let ExpectationFailedException = class extends HttpException {
	constructor(message: string = 'Expectation Failed', additionalInfo: any = {}) {
		super(message, HttpStatus.EXPECTATION_FAILED, additionalInfo)
	}
}
