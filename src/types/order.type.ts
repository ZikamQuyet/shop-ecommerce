export interface IOderDetail {
  product_id: string
  price: string
  quantity: string
  size: string
  color: string
}
export interface IUserInfoOrder {
  name: string
  phoneNumber: string
  email: string
  address: string
}

export interface IOder {
  total_price: string
  order_detail: IOderDetail[]
  user_info: IUserInfoOrder
}
