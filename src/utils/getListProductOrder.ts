import { ICart } from '../types/cart.type'

export const getListProductOrder = (data: any) => {
  const listProductOrder: any = []
  data.forEach((item: ICart) => {
    listProductOrder.push({
      product_id: item.id + '',
      price: item.price + '',
      quantity: item.quantity + '',
      size: item.size + '',
      color: item.color + ''
    })
  })
  return listProductOrder
}
