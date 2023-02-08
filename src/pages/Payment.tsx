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
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import { FIRST } from '../constants/constants'

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Không bỏ trống tên'),
    phone: yup
      .string()
      .required('Không bỏ trống số điện thoại')
      .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Sai định dạng SĐT'),
    email: yup.string().required('Không bỏ trống email').email('Không đúng định dạng email'),
    address: yup.string().required('Không bỏ trống địa chỉ'),
    payment: yup.string().required('Hãy chọn phương thức thanh toán')
  })
  .required('Bạn chưa điền thông tin')

const Payment = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const arrErr: any = Object.values(errors)
    if (arrErr.length > 0) {
      toast.error(arrErr[FIRST]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])

  const handleOrder = (data: any) => {
    console.log('data', data)
  }
  return (
    <Container maxWidth={'xl'}>
      <Grid container margin={'8rem 0'} spacing={3} component='form' onSubmit={handleSubmit(handleOrder)}>
        <Grid item xs={12} lg={4}>
          <Typography variant='h5'>Đơn hàng (3 sản phẩm)</Typography>
          <List disablePadding>
            <ListItem sx={{ padding: '1rem 0', gap: '2rem' }} disablePadding alignItems='flex-start'>
              <Badge badgeContent={3} color='primary' sx={{ width: '100px', height: '100px' }}>
                <img
                  src='https://bizweb.dktcdn.net/thumb/large/100/414/728/products/12-4.jpg?v=1672389518000'
                  alt='img'
                />
              </Badge>
              <Box>
                <Typography variant='h6'>sản phẩm 1</Typography>
                <Typography>999999 vnd</Typography>
              </Box>
            </ListItem>
          </List>
          <Divider />
          <Stack direction={'row'} justifyContent='space-between' margin='1rem 0'>
            <Typography>Tổng cộng:</Typography>
            <Typography> 1000000 vnd</Typography>
          </Stack>

          <Stack direction={'row'} justifyContent='space-between'>
            <Button
              variant='outlined'
              onClick={() => {
                navigate('/cart')
              }}
            >
              Quay về giỏ hàng
            </Button>
            <Button variant='contained' type='submit'>
              Đặt hàng
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography variant='h5'>Thông tin khách hàng</Typography>
          <Stack gap={3}>
            <Controller
              render={({ field, formState }) => (
                <TextField {...field} id='name' error={!!formState.errors?.name} label='Họ tên' variant='standard' />
              )}
              name='name'
              control={control}
              defaultValue=''
            />

            <Controller
              render={({ field, formState }) => (
                <TextField {...field} id='phone' error={!!formState.errors?.phone} label='SĐT' variant='standard' />
              )}
              name='phone'
              control={control}
              defaultValue=''
            />
            <Controller
              render={({ field, formState }) => (
                <TextField {...field} id='email' error={!!formState.errors?.email} label='Email' variant='standard' />
              )}
              name='email'
              control={control}
              defaultValue=''
            />
            <Controller
              render={({ field, formState }) => (
                <TextField
                  {...field}
                  id='address'
                  error={!!formState.errors?.address}
                  label='Địa chỉ'
                  variant='standard'
                />
              )}
              name='address'
              control={control}
              defaultValue=''
            />
            <Controller
              render={({ field, formState }) => (
                <FormControl sx={{ width: '80%' }}>
                  <FormLabel error={!!formState.errors?.payment} id='demo-radio-buttons-group-label'>
                    Phương thức thanh toán
                  </FormLabel>
                  <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                    <FormControlLabel value='COD' control={<Radio />} label='Thanh toán khi nhận hàng' />
                  </RadioGroup>
                </FormControl>
              )}
              name='payment'
              control={control}
              defaultValue='COD'
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Payment
