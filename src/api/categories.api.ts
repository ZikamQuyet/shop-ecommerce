import axiosClient from './axiosClient';

export const getCategories = () => axiosClient.get('categories')

export const getCategory = (id: number | string | undefined, page: number | string | undefined) =>
  axiosClient.get(`categories/${id}`, {
    params: {
      page: page
    }
  })
