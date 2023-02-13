import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { loginAPI } from '../../api/login.api'
import { registerAPI } from '../../api/register.api'
import { TLogin } from '../../types/login.type'
import { IRegister } from '../../types/register.type'

interface authState {
  tokenLogin: string | null
  tokenRegister: string | null
}
const initialState: authState = {
  tokenLogin: null,
  tokenRegister: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.tokenLogin = action.payload.token
    },
    registerSuccess(state, action) {
      state.tokenRegister = action.payload.token
    }
  }
})
export const login =
  (data: TLogin) => async (dispatch: (arg0: { payload: any; type: 'auth/loginSuccess' }) => void) => {
    try {
      const res = await loginAPI(data)
      dispatch(loginSuccess(res))
    } catch (error) {
      toast.error('Bạn nhập sai Email hoặc Mật khẩu')
    }
  }
export const register =
  (data: IRegister) => async (dispatch: (arg0: { payload: any; type: 'auth/registerSuccess' }) => void) => {
    try {
      const res = await registerAPI(data)
      dispatch(registerSuccess(res))
    } catch (error) {
      toast.error('Đăng ký thất bại')
    }
  }
export const { loginSuccess, registerSuccess } = authSlice.actions

export default authSlice.reducer
