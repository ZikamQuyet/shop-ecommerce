import { Box, Button, Container, Stack, Typography, useMediaQuery } from '@mui/material'
import { images } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const OrderSuccess = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const { t } = useTranslation(['page'])
  const navigate = useNavigate()

  const handleClickComeBackHome = () => {
    navigate('/')
  }
  useEffect(() => {
    document.title = 'Thành công'
  }, [])
  return (
    <Container maxWidth={'xl'}>
      <Stack justifyContent={'center'} alignItems='center' gap={3} m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
        <Box maxWidth={'25rem'}>
          <img src={images.paymentSuccess} alt='image-success' />
        </Box>
        <Button variant='contained' onClick={handleClickComeBackHome}>
          {t('notFoundPage.go to back home')}
        </Button>
      </Stack>
    </Container>
  )
}

export default OrderSuccess
