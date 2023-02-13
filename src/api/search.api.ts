import axiosClient from './axiosClient'

export const getProductsSearch = (param: string | undefined) =>
  axiosClient.get('search', {
    params: {
      param: param
    }
  })
