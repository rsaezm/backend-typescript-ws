import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'

export interface IPassword extends mongoose.Document<string> {
	Password: string
	FechaActualizacion: Date
	FechaVigencia: Date
};

export interface IAutenticacion extends mongoose.Document<string> {
	Password?: IPassword
};

export interface IUsuario extends mongoose.Document<string> {
	Username?: string
	CorreoElectronico: string
	Autenticacion: IAutenticacion
};

export const PasswordSchema = new mongoose.Schema<IPassword>({
	Password: { type: mongoose.SchemaTypes.String, required: true },
	FechaActualizacion: { type: mongoose.SchemaTypes.Date, required: true },
	FechaVigencia: { type: mongoose.SchemaTypes.Date, required: true },
}, {
	_id: false,
	id: false,
	strict: true,
	timestamps: false,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	versionKey: false,
})

export const AutenticacionSchema = new mongoose.Schema<IAutenticacion>({
	Password: { type: PasswordSchema, required: false },
}, {
	_id: false,
	id: false,
	strict: true,
	timestamps: false,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	versionKey: false
})

export const UsuarioSchema = new mongoose.Schema<IUsuario>({
	Username: { type: mongoose.SchemaTypes.String, required: false, sparse: true, unique: true, lowercase: true, },
	CorreoElectronico: { type: mongoose.SchemaTypes.String, required: true, lowercase: true },
	Autenticacion: { type: AutenticacionSchema, required: true },
}, {
	collection: 'Membresia.Usuario',
	id: false,
	strict: true,
	timestamps: false,
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	versionKey: false,
}).plugin(mongooseAutoPopulate)

export const UsuarioRepository = mongoose.model<IUsuario>('Usuario', UsuarioSchema)