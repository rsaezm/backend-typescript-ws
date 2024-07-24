import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator'
import { IUsuarioEntity } from '../../interfaces'

export class UsuarioEntity implements IUsuarioEntity {
	@IsEmail()
	@IsNotEmpty()
	CorreoElectronico: string

	@IsOptional()
	Username?: string

	@IsNotEmpty()
	@IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
	Password: string
}