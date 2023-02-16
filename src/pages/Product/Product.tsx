import * as yup from 'yup'
import BannerListProduct from './BannerListProduct'
import BannerProduct from './BannerProduct'
import React, { useEffect } from 'react'
import SkeletonLoading from '../../components/SkeletonLoading'
import Typography from '@mui/material/Typography'
import { addToCart } from '../../redux/slice/cartSlice'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { convertPrice } from '../../utils/convertPrice'
import { FIRST } from '../../constants/constants'
import { getProduct } from '../../api/product.api'
import { realPrice } from '../../utils/realPrice'
import { useAppDispatch } from '../../redux/hooks'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { getSavePriceItem } from '../../utils/getTotal'
import { IOption, IProduct } from '../../types/product.type'

const schema = yup
  .object()
  .shape({
    color: yup.string().required(),
    size: yup.string().required()
  })
  .required()

const Product: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['page'])
  const {
    control,
    handleSubmit
    // formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })
  const { productId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId)
  })

  const product: IProduct = data?.data

  const handleAddToCart = (data: any) => {
    try {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: realPrice(+product.price, +product.discount),
          img: product.images[FIRST].product_img,
          color: data.color,
          size: data.size
        })
      )
    } catch (error) {}
  }

  useEffect(() => {
    document.title = product?.name
  }, [product])

  return (
    <>
      {isLoading && <SkeletonLoading />}
      {!isLoading && (
        <Container maxWidth='xl'>
          <Box m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
            <Grid
              container
              justifyContent='center'
              gap={matches900 ? 20 : 5}
              component='form'
              mb={10}
              onSubmit={handleSubmit(handleAddToCart)}
            >
              <Grid item xs={12} md={5} width='50%'>
                <Box>
                  <BannerProduct dataImages={product.images} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} display='flex' flexDirection='column' gap={2}>
                <Typography variant='h4'>{product.name}</Typography>
                <Divider />
                <Stack direction={'row'} gap={2} alignItems='flex-end'>
                  <Typography> {convertPrice(realPrice(+product.price, +product.discount))} </Typography>
                  <Typography fontSize={12} sx={{ textDecoration: 'line-through' }}>
                    {convertPrice(product.price)}
                  </Typography>
                </Stack>
                <Typography>
                  {t('productPage.save')}{' '}
                  <Typography color='secondary' component={'span'}>
                    {convertPrice(getSavePriceItem(product.price, product.discount))}
                  </Typography>
                </Typography>
                <Divider />
                {product.colors.length > 0 && (
                  <Box>
                    <Typography fontWeight={500}>{t('page:color')}</Typography>
                    <Controller
                      render={({ field }) => (
                        <FormControl sx={{ width: '80%' }}>
                          <RadioGroup {...field} sx={{ flexDirection: 'row', gap: '5px' }}>
                            {product.colors.map((color: IOption, index: number) => (
                              <FormControlLabel
                                key={index}
                                value={color.value_name}
                                control={
                                  <Radio
                                    sx={{
                                      background: '#ccc',
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
                    <Typography fontWeight={500}>{t('page:size')}</Typography>
                    <Controller
                      render={({ field }) => (
                        <FormControl sx={{ width: '80%' }}>
                          <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                            {product.sizes.map((size: IOption, index: number) => (
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
                  {t('add cart')}
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
