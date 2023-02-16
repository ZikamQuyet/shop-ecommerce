import React, { useState } from 'react'
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import { Box, useMediaQuery, Skeleton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { IImage } from '../../types/product.type'

interface IBannerProduct {
  dataImages: IImage[]
}
const BannerProduct: React.FC<IBannerProduct> = ({ dataImages }) => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const [activeThumb, setActiveThumb] = useState<SwiperCore>()
  const [isLoadingImg1, setIsLoadingImg1] = useState(false)
  const [isLoadingImg2, setIsLoadingImg2] = useState(false)
  return (
    <>
      <Swiper
        loop={true}
        navigation={matches900 ? true : false}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
        className='vehicle-image-slider'
        style={{ marginBottom: '0.5rem' }}
      >
        {dataImages.map((item: IImage) => (
          <SwiperSlide key={item.id}>
            <Box height={matches900 ? '37.5rem' : 'unset'}>
              {!isLoadingImg1 && <Skeleton sx={{ height: '100%', width: '100%', transform: 'unset' }} />}
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='product-image'
                style={{ height: '100%' }}
                onLoad={() => setIsLoadingImg1(true)}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        spaceBetween={10}
        loop={true}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className='vehicle-image-slider-thumbs'
      >
        {dataImages.map((item: IImage) => (
          <SwiperSlide key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box className='thumbs-wrapper' height={matches900 ? '9.375rem' : 'unset'}>
              {!isLoadingImg2 && <Skeleton sx={{ height: '100%', width: '100%', transform: 'unset' }} />}
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='product-image'
                style={{ height: '100%' }}
                onLoad={() => setIsLoadingImg2(true)}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default BannerProduct
