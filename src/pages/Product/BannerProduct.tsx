import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useMediaQuery, Box } from '@mui/material'

import React, { useEffect } from 'react'
const dataImagesProduct = [
  {
    id: 'p1',
    img: 'images/product/sp-1-1.jpg'
  },
  {
    id: 'p2',
    img: 'images/product/sp-1-2.jpg'
  },
  {
    id: 'p3',
    img: 'images/product/sp-1-3.jpg'
  },
  {
    id: 'p4',
    img: 'images/product/sp-1-4.jpg'
  },
  {
    id: 'p5',
    img: 'images/product/sp-1-5.jpg'
  }
]
interface IBannerProduct {
  dataImages: any
}
const BannerProduct: React.FC<IBannerProduct> = ({ dataImages }) => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const [activeThumb, setActiveThumb] = React.useState<SwiperCore>()
  console.log('dataImages', dataImages)
  // return null
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
        {dataImages.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Box sx={{ height: '600px' }}>
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='lamborgini image'
                style={{ height: '100%' }}
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
        {dataImages.map((item: any, index: number) => (
          <SwiperSlide key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box className='thumbs-wrapper' sx={{ height: '150px' }}>
              <img
                src={`http://duy.fresher.ameladev.click/storage/uploads/${item.product_img}`}
                alt='lamborgini image'
                style={{ height: '100%' }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default BannerProduct
