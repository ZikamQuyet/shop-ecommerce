import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CardProduct from '../../components/CardProduct'

const BannerListProduct = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  return (
    <>
      <Box>
        <Divider sx={{ marginBottom: '2rem' }} variant='fullWidth'>
          <Typography variant='h5' textAlign='center'>
            Sản phẩm liên quan
          </Typography>
        </Divider>

        <Swiper
          slidesPerView={matches900 ? 4 : 2}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          loop={true}
          navigation={matches900 ? true : false}
          modules={[Autoplay, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <CardProduct />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct />
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  )
}

export default BannerListProduct
