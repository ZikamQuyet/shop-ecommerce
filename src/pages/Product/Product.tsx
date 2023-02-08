import {
  Box,
  Container,
  Grid,
  Divider,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import BannerProduct from './BannerProduct'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'

import BannerListProduct from './BannerListProduct'

import { convertPrice } from '../../utils/convertPrice'
import { useQueryString } from '../../hooks/useQueryString'
import { useParams } from 'react-router-dom'
import { getProduct, getProducts } from '../../api/product'
import SkeletonLoading from '../../components/SkeletonLoading'
import { FIRST } from '../../constants/constants'

const schema = yup
  .object()
  .shape({
    color: yup.string().required(),
    size: yup.string().required()
  })
  .required()
const Product = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const { productId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId)
  })

  const product = data?.data
  console.log('data 1 product', data?.data)

  useEffect(() => {
    document.title = product?.name
  }, [product])

  return (
    <>
      {isLoading && <SkeletonLoading />}
      {!isLoading && (
        <Container maxWidth='xl'>
          <Box m={'10rem 0 4rem'}>
            <Grid container justifyContent='center' gap={20} component='form' mb={10}>
              <Grid item xs={12} md={5} width='50%'>
                <Box>
                  <BannerProduct dataImages={product.images} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} display='flex' flexDirection='column' gap={2}>
                <Typography variant='h4'>{product.name}</Typography>
                <Divider />
                <Stack direction={'row'} gap={2} alignItems='flex-end'>
                  <Typography> {convertPrice(product.price)} </Typography>
                  <Typography fontSize={12} sx={{ textDecoration: 'line-through' }}>
                    {convertPrice(product.price)}
                  </Typography>
                </Stack>
                <Typography>
                  Tiết kiệm:{' '}
                  <Typography color='secondary' component={'span'}>
                    {convertPrice(product.price)}
                  </Typography>
                </Typography>
                <Divider />
                {product.colors.length > 0 && (
                  <Box>
                    <Typography fontWeight={500}>Màu sắc:</Typography>
                    <Controller
                      render={({ field }) => (
                        <FormControl sx={{ width: '80%' }}>
                          <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                            {product.colors.map((color: any, index: number) => (
                              <FormControlLabel
                                key={index}
                                value={color.value_name}
                                control={
                                  <Radio
                                    sx={{
                                      color: color.value_name,
                                      '&.Mui-checked': {
                                        color: color.value_name
                                      }
                                    }}
                                  />
                                }
                                label=''
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                      name='color'
                      control={control}
                      defaultValue={product.colors[FIRST].value_name}
                    />
                  </Box>
                )}
                {product.sizes.length > 0 && (
                  <Box>
                    <Typography fontWeight={500}>Kích thước:</Typography>
                    <Controller
                      render={({ field }) => (
                        <FormControl sx={{ width: '80%' }}>
                          <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                            {product.sizes.map((size: any, index: number) => (
                              <FormControlLabel
                                key={index}
                                value={size.value_name}
                                control={<Radio />}
                                label={size.value_name}
                                sx={{ textTransform: 'uppercase' }}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                      name='size'
                      control={control}
                      defaultValue={product.sizes[FIRST].value_name}
                    />
                  </Box>
                )}

                <Button variant='contained' type='submit'>
                  Thêm vào giỏ hàng
                </Button>
                <Box sx={{ whiteSpace: 'pre-wrap', lineHeight: '3rem' }}>{product.description}</Box>
              </Grid>
            </Grid>
            <BannerListProduct />
          </Box>
        </Container>
      )}
    </>
  )
}

export default Product
