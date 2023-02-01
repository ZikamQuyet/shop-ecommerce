import React from 'react';
import { Autoplay, Navigation } from 'swiper';
import { Box, Link, useMediaQuery } from '@mui/material';
import { IDataBanner } from '../constants/dataBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




interface IBanner {
  data: IDataBanner[]
}
const Banner: React.FC<IBanner> = ({ data }) => {
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
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={item.href}>
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
