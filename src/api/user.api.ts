import { IDateUpdateUser } from '../types/user.type'
import axiosClient from './axiosClient'

export const getUser: any = () => axiosClient.get('user')
export const updateUser = (dataUser: IDateUpdateUser) => axiosClient.put('member/edit', dataUser)
