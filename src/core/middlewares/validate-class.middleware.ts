import { sanitize } from 'class-sanitizer'
import { plainToInstance } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { BadRequestException } from '../exceptions'

export let ValidateClass = function (type: any, skipMissingProperties = false): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			switch (req.method) {
				case 'GET':
					{
						const dtoObj: any = plainToInstance(type, req.query)

						sanitize(dtoObj)

						req.query = dtoObj

						if (Object.values(dtoObj).length !== 0 || skipMissingProperties == false) {
							const errors: ValidationError[] = await validate(dtoObj, {
								whitelist: true,
								forbidNonWhitelisted: true,
								forbidUnknownValues: true,
								skipMissingProperties: skipMissingProperties,
							})

							if (errors.length !== 0) next(new BadRequestException('Se han producido errores de validación', errors))
						}

						next()

						break
					}
				default:
					{
						const dtoObj: any = plainToInstance(type, req.body)

						sanitize(dtoObj)

						req.body = dtoObj

						const errors: ValidationError[] = await validate(dtoObj, {
							whitelist: true,
							forbidNonWhitelisted: true,
							forbidUnknownValues: true,
							skipMissingProperties: skipMissingProperties,
						})

						if (errors.length !== 0) next(new BadRequestException('Se han producido errores de validación ' + req.method, errors))

						next()
					}
			}
		} catch (error) {
			next(new BadRequestException('Se ha producido un error al validar la petición', error))
		}
	}
}
