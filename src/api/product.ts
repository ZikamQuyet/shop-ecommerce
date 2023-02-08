import axiosClient from './axiosClient'

export const getProducts = (page: number | string | undefined) =>
  axiosClient.get('products', {
    params: {
      page: page
    }
  })
export const getProduct = (id?: number | string | undefined) => axiosClient.get(`products/${id}`)
