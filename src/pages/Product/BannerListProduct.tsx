import CardProduct from '../../components/CardProduct'
import React from 'react'
import { Autoplay, Navigation } from 'swiper'
import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { getProducts } from '../../api/product.api'
import { ONE } from '../../constants/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TCardProduct } from '../../types/product.type'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const BannerListProduct: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const { t } = useTranslation(['page'])

  const getListProduct = useQuery({
    queryKey: ['products', ONE],
    queryFn: () => getProducts(ONE)
  })
  const listProduct: TCardProduct[] = getListProduct.data?.data.data

  return (
    <>
      <Box>
        <Divider sx={{ marginBottom: '2rem' }} variant='fullWidth'>
          <Typography variant='h5' textAlign='center'>
            {t('productPage.related products')}
          </Typography>
        </Divider>

        {listProduct && (
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
            {listProduct.map((product: TCardProduct) => (
              <SwiperSlide key={product.id}>
                <CardProduct dataProduct={product} />
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
