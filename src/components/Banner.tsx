import React, { useState } from 'react'
import { Autoplay, Navigation } from 'swiper'
import { Box, useMediaQuery, Skeleton } from '@mui/material'
import { IDataBanner } from '../constants/dataBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import SkeletonLoading from './SkeletonLoading'

interface IBanner {
  dataBanner: IDataBanner[]
}
const Banner: React.FC<IBanner> = ({ dataBanner }) => {
  const matches900 = useMediaQuery('(min-width:900px)')
  return (
    <>
      <Box>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          loop={true}
          navigation={matches900 ? true : false}
          modules={[Autoplay, Navigation]}
          className='mySwiper'
        >
          {dataBanner.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={item.href}>
                <img src={item.img} alt='banner' />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  )
}

export default Banner
