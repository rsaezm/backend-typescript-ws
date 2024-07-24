import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let PaymentRequiredException = class extends HttpException {
	constructor(message: string = 'Payment Required', additionalInfo: any = {}) {
		super(message, HttpStatus.PAYMENT_REQUIRED, additionalInfo)
	}
}
