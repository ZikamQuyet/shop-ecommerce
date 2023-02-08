import { TLogin } from '../types/login.type'
import axiosClient from './axiosClient'

export const loginAPI = ({ email, password }: TLogin) =>
  axiosClient.post('login', {
    email,
    password
  })
