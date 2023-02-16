import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ICart } from '../../types/cart.type'

const initialState: any = {
  cart: []
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item: ICart) => item.id === action.payload.id)
      toast.success('Thêm sản phẩm thành công')
      if (action.payload.size && action.payload.color) {
        if (itemInCart && itemInCart.color === action.payload.color && itemInCart.size === action.payload.size) {
          itemInCart.quantity = itemInCart.quantity + 1
        } else {
          state.cart.push({ ...action.payload, quantity: 1 })
        }
      } else {
        if (itemInCart) {
          itemInCart.quantity++
        } else {
          state.cart.push({ ...action.payload, quantity: 1, size: 'M', color: 'black' })
        }
      }
      // if (itemInCart) {
      //   itemInCart.quantity++
      // } else {
      //   state.cart.push({ ...action.payload, quantity: 1 })
      // }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item: ICart) =>
          item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      )
      item.quantity++
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item: ICart) =>
          item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      )
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      state.cart.forEach(function (item: ICart, index: number, object: ICart[]) {
        if (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size) {
          object.splice(index, 1)
        }
      })
      state.cart
    },
    changeColor: (state, action) => {
      const itemInCart = state.cart.find(
        (item: ICart) =>
          item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      )
      itemInCart.color = action.payload.colorChange
    },
    changeSize: (state, action) => {
      const itemInCart = state.cart.find(
        (item: ICart) =>
          item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
      )

      itemInCart.size = action.payload.sizeChange
    },
    removeCart: (state, action) => {
      state.cart = action.payload
    }
  }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeItem, changeColor, changeSize, removeCart } =
  cartSlice.actions
export default cartSlice.reducer
