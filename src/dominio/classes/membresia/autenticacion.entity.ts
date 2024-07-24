import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ILoginEntity } from '../../interfaces'

export class LoginEntity implements ILoginEntity{
	@IsEmail()
	@IsNotEmpty()
	CorreoElectronico: string

	@IsNotEmpty()
	@IsString()
	Password: string
}