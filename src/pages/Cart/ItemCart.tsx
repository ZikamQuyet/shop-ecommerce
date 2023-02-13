import Count from '../../components/Count'
import React, { useState } from 'react'
import Selector from './Selector'
import { BASE_URL_IMAGE } from '../../constants/constants'
import { Box, Button, Divider, Grid, ListItem, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import { convertPrice } from '../../utils/convertPrice'
import { decrementQuantity, incrementQuantity, removeItem } from '../../redux/slice/cartSlice'
import { getProduct } from '../../api/product.api'
import { getTotalPriceItem } from '../../utils/getTotal'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { IProduct } from '../../types/product.type'
import { ICart } from '../../types/cart.type'

interface IItemCart {
  item: ICart
}
const ItemCart: React.FC<IItemCart> = ({ item }) => {
  const matches600 = useMediaQuery('(min-width:600px)')
  const { t } = useTranslation(['page'])
  const dispatch = useAppDispatch()

  const [isLoadingImg, setIsLoadingImg] = useState(false)

  const { data } = useQuery({
    queryKey: ['product', item.id],
    queryFn: () => getProduct(item.id)
  })

  const product: IProduct = data?.data

  return (
    <>
      <ListItem disableGutters alignItems='center'>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={3}>
            <Link to={`/product/${item.id}`}>
              {!isLoadingImg && <Skeleton height={'180px'} width='auto' />}
              <img
                src={`${BASE_URL_IMAGE}${item.img}`}
                alt='product'
                style={{ height: '180px', width: 'auto', objectFit: 'cover' }}
                onLoad={() => setIsLoadingImg(true)}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} m='auto'>
            <Stack gap={1}>
              <Link to={`/product/${item.id}`}>{item.name}</Link>
              <Stack direction='row' gap={2}>
                {item.color && (
                  <Selector
                    title='Color'
                    dataProduct={product?.colors}
                    id={item.id}
                    color={item.color}
                    size={item.size}
                  />
                )}
                {item.size && (
                  <Selector
                    title='Size'
                    dataProduct={product?.sizes}
                    id={item.id}
                    color={item.color}
                    size={item.size}
                  />
                )}
              </Stack>
              <Box>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => {
                    dispatch(removeItem({ id: item.id, color: item.color, size: item.size }))
                  }}
                >
                  {t('delete')}
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={2} textAlign={`${matches600 ? 'center' : 'unset'}`} m={'auto'}>
            <Typography color={'secondary'} fontWeight={500}>
              {convertPrice(getTotalPriceItem(item.price, item.quantity))}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            display={`${matches600 ? 'flex' : 'unset'}`}
            justifyContent={`${matches600 ? 'center' : 'unset'}`}
            alignItems={`${matches600 ? 'center' : 'unset'}`}
          >
            <Count
              decrement={() => {
                dispatch(decrementQuantity({ id: item.id, color: item.color, size: item.size }))
              }}
              increment={() => dispatch(incrementQuantity({ id: item.id, color: item.color, size: item.size }))}
              quantity={item.quantity}
            />
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  )
}

export default ItemCart
