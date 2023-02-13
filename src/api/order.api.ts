import axiosClient from './axiosClient'

export const addOrder = (order: any) => axiosClient.post(`orders`, order)
