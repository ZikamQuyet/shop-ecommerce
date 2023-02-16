import Banner from '../components/Banner'
import React, { useEffect } from 'react'
import { dataMainBanner, dataStoryBanner } from '../constants/dataBanner'
import { Grid } from '@mui/material'
import { images } from '../assets'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation('defaultLayout')
  useEffect(() => {
    document.title = t('home')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
      <Banner dataBanner={dataMainBanner} />
      <Grid container spacing={5} p={'1rem'}>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link to={'/collections/2'}>
            <img src={images.categoryBanner1} alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link to={'/collections/3'}>
            <img src={images.categoryBanner2} alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={4} textAlign={'center'}>
          <Link to={'/collections/4'}>
            <img src={images.categoryBanner3} alt='category-banner' />
          </Link>
        </Grid>
      </Grid>
      <Banner dataBanner={dataStoryBanner} />
    </>
  )
}

export default Home
