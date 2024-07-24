import HttpStatus from 'http-status-codes'

export class HttpException {
	public status: number
	public message: string
	public additionalInfo: any

	constructor(message: string = 'Ups!, algo ha salido mal', status: number = HttpStatus.INTERNAL_SERVER_ERROR, additionalInfo: any = {}) {
		this.message = message
		this.status = status
		this.additionalInfo = additionalInfo
	}
};
