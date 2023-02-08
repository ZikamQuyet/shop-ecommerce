import { IRegister } from './register.type'

export type TLogin = Pick<IRegister, 'email' | 'password'>
