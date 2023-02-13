import { IRegister } from '../types/register.type'
import axiosClient from './axiosClient'

export const registerAPI = ({ name, email, password, passwordConfirmation }: IRegister) =>
  axiosClient.post('register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  })
