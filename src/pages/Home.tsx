import Banner from '../components/Banner'
import React from 'react'
import { dataMainBanner, dataStoryBanner } from '../constants/dataBanner'
import { Grid, Link } from '@mui/material'
import { images } from '../assets'

const Home: React.FC = () => {
  return (
    <>
      <Banner data={dataMainBanner} />
      <Grid container spacing={5} p={'1rem'}>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link href='#'>
            <img src={images.categoryBanner1} alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link href='#'>
            <img src={images.categoryBanner2} alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={4} textAlign={'center'}>
          <Link href='#'>
            <img src={images.categoryBanner3} alt='category-banner' />
          </Link>
        </Grid>
      </Grid>
      <Banner data={dataStoryBanner} />
    </>
  )
}

export default Home
