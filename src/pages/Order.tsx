import * as yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { addOrder } from '../api/order.api';
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery
  } from '@mui/material';
import { BASE_URL_IMAGE, FIRST } from '../constants/constants';
import { Controller, useForm } from 'react-hook-form';
import { convertPrice } from '../utils/convertPrice';
import { getListProductOrder } from '../utils/getListProductOrder';
import { getTotal, getTotalPriceItem } from '../utils/getTotal';
import { getUser } from '../api/user.api';
import { ICart } from '../types/cart.type';
import { IOder } from '../types/order.type';
import { IUser } from '../types/user.type';
import { removeCart } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

const Order: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const { t } = useTranslation(['auth', 'page'])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const auth = useAppSelector((state: any) => state.auth)

  const cart = useAppSelector((state) => state.cart)
  const dataCart: ICart[] = cart.cart

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          name: yup.string().required(t('auth:validation.name is required')),
          phone: yup
            .string()
            .required(t('auth:validation.phone is required'))
            .matches(
              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              t('auth:validation.phone error')
            ),
          email: yup
            .string()
            .required(t('auth:validation.email is required'))
            .email(t('auth:validation.wrong email format')),
          address: yup.string().required(t('auth:validation.address is required')),
          payment: yup.string().required(t('auth:validation.payment is required'))
        })
        .required(),
    []
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })
  const { mutate } = useMutation({
    mutationFn: (body: IOder) => addOrder(body)
  })

  const [isLoadingImg, setIsLoadingImg] = useState(false)

  const getDataUser = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: auth.tokenLogin ? true : false
  })
  const dataUser: IUser = getDataUser.data?.user

  const handleOrder = (data: any) => {
    const orders: IOder = {
      total_price: getTotal(dataCart).totalPrice + '',
      order_detail: getListProductOrder(dataCart),
      user_info: {
        name: data.name + '',
        phoneNumber: data.phone + '',
        email: data.email + '',
        address: data.address + ''
      }
    }
    mutate(orders, {
      onSuccess: () => {
        dispatch(removeCart([]))
        navigate('/order-success')
      },
      onError: () => toast.error('Thanh toán thất bại')
    })
  }
  useEffect(() => {
    if (!auth.tokenLogin) {
      navigate('/login')
    }
  }, [auth, navigate])

  useEffect(() => {
    const arrErr: any = Object.values(errors)
    if (arrErr.length > 0) {
      toast.error(arrErr[FIRST]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])
  useEffect(() => {
    document.title = t('page:orderPage.payment')
  }, [])

  return (
    <Container maxWidth={'xl'}>
      <Box m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'} component='form' onSubmit={handleSubmit(handleOrder)}>
        <Grid container spacing={10}>
          <Grid item xs={12} lg={8}>
            <Typography variant='h5'>{t('page:orderPage.customer information')}</Typography>
            <Stack gap={3}>
              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='name'
                    error={!!formState.errors?.name}
                    label={t('auth:register.name')}
                    variant='standard'
                  />
                )}
                name='name'
                control={control}
                defaultValue={dataUser?.name || ''}
              />

              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='phone'
                    error={!!formState.errors?.phone}
                    label={t('auth:register.phone')}
                    variant='standard'
                  />
                )}
                name='phone'
                control={control}
                defaultValue={dataUser?.profiles.numberPhone || ''}
              />
              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='email'
                    error={!!formState.errors?.email}
                    label={t('auth:login.email')}
                    variant='standard'
                  />
                )}
                name='email'
                control={control}
                defaultValue={dataUser?.email || ''}
              />
              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='address'
                    error={!!formState.errors?.address}
                    label={t('auth:register.address')}
                    variant='standard'
                  />
                )}
                name='address'
                control={control}
                defaultValue={dataUser?.profiles.address || ''}
              />
              <Controller
                render={({ field, formState }) => (
                  <FormControl sx={{ width: '80%' }}>
                    <FormLabel error={!!formState.errors?.payment} id='demo-radio-buttons-group-label'>
                      {t('page:orderPage.payment methods')}
                    </FormLabel>
                    <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                      <FormControlLabel
                        value='COD'
                        control={<Radio />}
                        label={t('page:orderPage.payment on delivery')}
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                name='payment'
                control={control}
                defaultValue='COD'
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography variant='h5'>
              {t('page:orderPage.order')} ({getTotal(dataCart).totalQuantity})
            </Typography>
            <List disablePadding>
              {dataCart.map((item: ICart) => (
                <Box>
                  <ListItem sx={{ padding: '1rem 0', gap: '2rem' }} disablePadding alignItems='flex-start'>
                    <Badge badgeContent={item.quantity} color='primary' sx={{ width: '100px', height: '100px' }}>
                      {!isLoadingImg && <Skeleton width={'100%'} height='100%' />}
                      <img src={`${BASE_URL_IMAGE}${item.img}`} alt='product' onLoad={() => setIsLoadingImg(true)} />
                    </Badge>
                    <Box>
                      <Typography variant='h6'>{item.name}</Typography>
                      <Stack direction='row' gap={2}>
                        <Typography fontSize={'12px'} fontStyle='italic'>
                          {t('page:size')} {item.size}
                        </Typography>
                        <Stack direction='row' gap={1}>
                          <Typography fontSize={'12px'} fontStyle='italic'>
                            {t('page:color')}
                          </Typography>
                          <Box width='1rem' height='1rem' bgcolor={item.color} display='inline-block' />
                        </Stack>
                      </Stack>

                      <Typography>{convertPrice(getTotalPriceItem(item.price, item.quantity))}</Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
            <Divider />
            <Stack direction={'row'} alignItems='center' justifyContent='space-between' margin='1rem 0'>
              <Typography>{t('page:orderPage.total')}</Typography>
              <Typography color={'secondary'} fontWeight={600} variant='h6'>
                {convertPrice(getTotal(dataCart).totalPrice)}
              </Typography>
            </Stack>

            <Stack direction={'row'} justifyContent='space-between'>
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/cart')
                }}
              >
                {t('page:orderPage.back to cart')}
              </Button>
              <Button variant='contained' type='submit' disabled={isSubmitting}>
                {t('page:orderPage.ordering')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Order
