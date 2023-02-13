import ItemCart from './ItemCart'
import { Box, Button, Container, Divider, Grid, List, Stack, Typography, useMediaQuery } from '@mui/material'
import { convertPrice } from '../../utils/convertPrice'
import { getTotal } from '../../utils/getTotal'
import { useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ICart } from '../../types/cart.type'

const Cart = () => {
  const matches900 = useMediaQuery('(min-width:900px)')

  const { t } = useTranslation(['page'])

  const navigate = useNavigate()

  const cart = useAppSelector((state) => state.cart)

  const dataCart: ICart[] = cart.cart

  useEffect(() => {
    document.title = t('cartPage.cart')
  }, [])
  return (
    <>
      <Container maxWidth='xl'>
        {dataCart.length === 0 && (
          <Box m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
            <Typography>{t('cartPage.no products')}</Typography>
          </Box>
        )}
        {dataCart.length !== 0 && (
          <Box m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
            <Stack direction={'row'} alignItems='flex-end' gap={1}>
              <Typography variant='h4'>{t('cartPage.cart')}</Typography>
              <Typography component={'span'}>({getTotal(dataCart).totalQuantity})</Typography>
            </Stack>
            <Grid container spacing={matches900 ? 10 : 5}>
              <Grid item xs={12} md={8}>
                <List>
                  {dataCart.map((item: ICart) => (
                    <Box key={item.id}>
                      <ItemCart item={item} />
                    </Box>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={4} display='flex' gap={1} flexDirection='column'>
                <Stack direction={'row'} justifyContent='space-between'>
                  <Typography>{t('cartPage.provisional')}</Typography>
                  <Typography fontWeight={'500'}>{convertPrice(getTotal(dataCart).totalPrice)}</Typography>
                </Stack>
                <Divider />
                <Stack direction={'row'} justifyContent='space-between'>
                  <Typography>{t('cartPage.into money')}</Typography>
                  <Typography fontWeight={'500'} variant='h6' color={'secondary'}>
                    {convertPrice(getTotal(dataCart).totalPrice)}
                  </Typography>
                </Stack>

                <Button
                  variant='contained'
                  onClick={() => {
                    navigate('/order')
                  }}
                >
                  {t('page:cartPage.pay now')}
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => {
                    navigate('/collections')
                  }}
                >
                  {t('cartPage.continue shopping')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  )
}

export default Cart
