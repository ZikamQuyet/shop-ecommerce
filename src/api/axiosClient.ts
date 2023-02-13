import axios from 'axios';
import { REACT_APP_API_URL } from '../constants/constants';

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json'
  }
})

axiosClient.interceptors.request.use(async (config: any) => {
  // Handle token here ...
  const dataReduxPersist: any = localStorage.getItem('persist:root')
  const token = JSON.parse(JSON.parse(dataReduxPersist).auth).tokenLogin

  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)

export default axiosClient
