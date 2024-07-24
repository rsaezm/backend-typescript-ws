import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NotAcceptableException } from '../exceptions'
import { injectable } from 'tsyringe'

@injectable<CryptService>() export class CryptService {
	public ComparePassword = async (clearPassword: string, hashedPassword: string): Promise<boolean> => {
		return await bcrypt.compare(clearPassword, hashedPassword)
	};

	public EncryptPassword = async (clearPassword: string): Promise<string> => {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(clearPassword, salt)
	};

	public DecodeToken = async <T>(token: string, ignoreExpiration: boolean = true): Promise<T> => {
		if (token.startsWith('Bearer ')) token = token.split('Bearer ')[1]

		let payload: T

		try {
			payload = jwt.verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration }) as T
		} catch (error) {
			throw new NotAcceptableException('La llave de activación proporcionada presentó un problema en la activación. Solicite una nueva llave de activación')
		}
		return payload
	};

	public GenerateAccessToken = async (payload: string | Buffer | object, persistent: boolean): Promise<string> => {

		return jwt.sign({ payload }, process.env.JWT_SECRET_KEY, { expiresIn: persistent? '365d': '1d' })
	};

	public GenerateRandomString = async (length: number): Promise<string> => {
		let result = ''
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const charactersLength = characters.length

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		return result
	};
}