import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'

export class CryptService {
	public static ComparePassword = async (clearPassword: string, hashedPassword: string): Promise<boolean> => {
		return await bcrypt.compare(clearPassword, hashedPassword)
	};

	public static EncryptPassword = async (clearPassword: string): Promise<string> => {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(clearPassword, salt)
	};

	public static DecodeToken = async <T>(token: string, ignoreExpiration: boolean = true): Promise<T> => {
		if (token.startsWith('Bearer ')) token = token.split('Bearer ')[1]

		try {
			return jwt.verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration }) as T
		} catch (error) {
			return null
		}
	};

	public static GenerateAccessToken = async <T = object>(payload: T, persistent: boolean): Promise<string> => {
		return jwt.sign(payload as object, process.env.JWT_SECRET_KEY, { expiresIn: persistent ? '365d' : '1d' })
	};

	public static GenerateRandomString = async (length: number): Promise<string> => {
		let result = ''
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const charactersLength = characters.length

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}

		return result
	};
}