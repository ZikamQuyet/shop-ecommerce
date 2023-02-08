import Banner from '../components/Banner'
import React, { useEffect } from 'react'
import { dataMainBanner, dataStoryBanner } from '../constants/dataBanner'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation('defaultLayout')
  useEffect(() => {
    document.title = t('home')
  }, [])
  return (
    <>
      <Banner data={dataMainBanner} />
      <Grid container spacing={5} p={'1rem'}>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link to={'/collections'}>
            <img src='images/category/category_banner_1.jpg' alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign={'center'}>
          <Link to={'/collections'}>
            <img src='images/category/category_banner_2.jpg' alt='category-banner' />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={4} textAlign={'center'}>
          <Link to={'/collections'}>
            <img src='images/category/category_banner_3.jpg' alt='category-banner' />
          </Link>
        </Grid>
      </Grid>
      <Banner data={dataStoryBanner} />
    </>
  )
}

export default Home
