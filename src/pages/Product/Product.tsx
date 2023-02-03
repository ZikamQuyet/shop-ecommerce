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
  Button,
  useMediaQuery
} from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import BannerProduct from './BannerProduct'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import BannerListProduct from './BannerListProduct'

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
  return (
    <>
      <Container maxWidth='xl'>
        <Box m={'10rem 0 4rem'}>
          <Grid container justifyContent='center' gap={20} component='form' mb={10}>
            <Grid item xs={12} md={5} width='50%'>
              <Box>
                <BannerProduct />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} display='flex' flexDirection='column' gap={2}>
              <Typography variant='h4'>SMILEY FACE HOODIE</Typography>
              <Divider />
              <Stack direction={'row'} gap={2} alignItems='flex-end'>
                <Typography>494.100₫ </Typography>
                <Typography fontSize={12} sx={{ textDecoration: 'line-through' }}>
                  549.000₫
                </Typography>
              </Stack>
              <Typography>
                Tiết kiệm:{' '}
                <Typography color='secondary' component={'span'}>
                  54.900₫
                </Typography>
              </Typography>
              <Divider />
              <Box>
                <Typography fontWeight={500}>Màu sắc:</Typography>

                <Controller
                  render={({ field }) => (
                    <FormControl sx={{ width: '80%' }}>
                      <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                        <FormControlLabel
                          value={'black'}
                          control={
                            <Radio
                              sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                  color: 'black'
                                }
                              }}
                            />
                          }
                          label=''
                        />

                        <FormControlLabel
                          value={'red'}
                          control={
                            <Radio
                              sx={{
                                color: 'red',
                                '&.Mui-checked': {
                                  color: 'red'
                                }
                              }}
                            />
                          }
                          label=''
                        />
                        <FormControlLabel
                          value={'green'}
                          control={
                            <Radio
                              sx={{
                                color: 'green',
                                '&.Mui-checked': {
                                  color: 'green'
                                }
                              }}
                            />
                          }
                          label=''
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                  name='color'
                  control={control}
                  defaultValue='black'
                />
              </Box>
              <Box>
                <Typography fontWeight={500}>Kích thước:</Typography>
                <Controller
                  render={({ field }) => (
                    <FormControl sx={{ width: '80%' }}>
                      <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                        <FormControlLabel value='m' control={<Radio />} label='M' />
                        <FormControlLabel value='l' control={<Radio />} label='L' />
                        <FormControlLabel value='xl' control={<Radio />} label='XL' />
                      </RadioGroup>
                    </FormControl>
                  )}
                  name='size'
                  control={control}
                  defaultValue='m'
                />
              </Box>
              <Button variant='contained' type='submit'>
                Thêm vào giỏ hàng
              </Button>
              <Stack gap={1}>
                <Typography fontWeight={500}>Mô tả:</Typography>
                <Typography>Chất liệu : Vải nỉ bông 300 GSM</Typography>
                <Typography>Màu sắc : Đen, Ghi đậm, Xanh lá</Typography>
                <Typography>Form dáng : Form Hoodie Regular</Typography>
                <Typography>
                  Cảm hứng thiết kế : Mặt trước in logo ClownZ cùng dòng chữ Smiley Face Brand, mặt sau in text ClownZ
                  được thiết kế theo style gothic, đi kèm dòng chữ Stand for northside ở bên dưới.{' '}
                </Typography>
                <Typography>Công nghệ in ấn / thiết kế : in kéo lụa hiệu ứng nổi vân đá </Typography>
                <Typography>Chi tiết đặc biệt : hình in có hiệu ứng nổi vân đặc biệt </Typography>
              </Stack>
            </Grid>
          </Grid>
          <BannerListProduct />
        </Box>
      </Container>
    </>
  )
}

export default Product
