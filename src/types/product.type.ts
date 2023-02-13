export interface IOption {
  value_name: string
}

export interface IImage {
  id: number
  product_id: number
  product_img: string
  created_at: string
  updated_at: string
}

export interface IProduct {
  id: number
  name: string
  price: number
  discount: number
  description: string
  quantity: number
  created_at: string
  updated_at: string
  sizes: IOption[]
  colors: IOption[]
  images: IImage[]
}
export type TCardProduct = Pick<
  IProduct,
  'id' | 'name' | 'price' | 'discount' | 'description' | 'quantity' | 'created_at' | 'updated_at' | 'images'
>

export interface IProductCartMini {
  color: string
  id: number
  img: string
  name: string
  price: number
  quantity: number
  size: string
}
export interface IPivot {
  category_id: number
  product_id: number
}

export interface IProductsCategories {
  id: number
  name: string
  price: number
  discount: number
  description: string
  quantity: number
  created_at: string
  updated_at: string
  pivot: IPivot
}

export interface ICategories {
  id: number
  title: string
  status: string
  created_at: string
  updated_at: string
  products: IProductsCategories[]
}
