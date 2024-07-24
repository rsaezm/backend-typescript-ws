import HttpStatus from 'http-status-codes'
import { HttpException } from './http-exception'

export let ProxyAuthenticationRequiredException = class extends HttpException {
	constructor(message: string = 'Proxy Authentication Required', additionalInfo: any = {}) {
		super(message, HttpStatus.PROXY_AUTHENTICATION_REQUIRED, additionalInfo)
	}
}
