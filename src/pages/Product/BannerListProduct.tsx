import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CardProduct from '../../components/CardProduct'
import { getProducts } from '../../api/product'
import { useQuery } from '@tanstack/react-query'

const BannerListProduct = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const { data, isLoading } = useQuery({
    queryKey: ['products', 1],
    queryFn: () => getProducts(1)
  })
  console.log('data banner sp lien quan', data?.data.data)
  return (
    <>
      <Box>
        <Divider sx={{ marginBottom: '2rem' }} variant='fullWidth'>
          <Typography variant='h5' textAlign='center'>
            Sản phẩm liên quan
          </Typography>
        </Divider>

        {data?.data.data && (
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
            {data?.data.data.map((product: any) => (
              <SwiperSlide>
                <CardProduct data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {}
      </Box>
    </>
  )
}

export default BannerListProduct
