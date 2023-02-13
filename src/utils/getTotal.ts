import { ICart } from '../types/cart.type'

export const getTotal = (data: ICart[]) => {
  let totalQuantity = 0
  let totalPrice = 0
  data.forEach((item: ICart) => {
    totalQuantity += item.quantity
    totalPrice += item.price * item.quantity
  })
  return { totalPrice, totalQuantity }
}

export const getTotalPriceItem = (price: number, quantity: number) => {
  return price * quantity
}

export const getSavePriceItem = (price: number, discount: number) => {
  return (price * discount) / 100
}
