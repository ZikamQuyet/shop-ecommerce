export const realPrice = (price: number, discount: number) => {
  if (discount) {
    return price - (price * discount) / 100
  }
  return price
}
