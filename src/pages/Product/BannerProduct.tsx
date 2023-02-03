import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useMediaQuery, Box } from '@mui/material'

import React from 'react'
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
const BannerProduct = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const [activeThumb, setActiveThumb] = React.useState<SwiperCore>()

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
        {dataImagesProduct.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ height: '700px' }}>
              <img src={item.img} alt='lamborgini image' style={{ height: '100%' }} />
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
        {dataImagesProduct.map((item, index) => (
          <SwiperSlide key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <Box className='thumbs-wrapper' sx={{ height: '150px' }}>
              <img src={item.img} alt='lamborgini image' style={{ height: '100%' }} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default BannerProduct
