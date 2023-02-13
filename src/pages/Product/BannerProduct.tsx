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
  const [isLoadingImg, setIsLoadingImg] = useState(false)
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
            <Box sx={{ height: '37.5rem' }}>
              {!isLoadingImg && <Skeleton height={'100%'} />}
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='product-image'
                style={{ height: '100%' }}
                onLoad={() => setIsLoadingImg(true)}
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
            <Box className='thumbs-wrapper' sx={{ height: '9.375rem' }}>
              {!isLoadingImg && <Skeleton height={'100%'} />}
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='product-image'
                style={{ height: '100%' }}
                onLoad={() => setIsLoadingImg(true)}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default BannerProduct
