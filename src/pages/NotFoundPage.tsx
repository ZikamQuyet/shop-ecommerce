import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { images } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation(['page'])
  const navigate = useNavigate()

  const handleClickComeBackHome = () => {
    navigate('/')
  }
  return (
    <Container maxWidth={'xl'}>
      <Stack justifyContent={'center'} alignItems='center' gap={3}>
        <Box maxWidth={'500px'}>
          <img src={images.bg404} alt='image-404' />
        </Box>
        <Stack textAlign={'center'} gap={1}>
          <Typography variant='h3'>{t('notFoundPage.txt1')}</Typography>
          <Typography>{t('notFoundPage.txt2')}</Typography>
          <Typography>{t('notFoundPage.txt3')}</Typography>
        </Stack>
        <Button variant='contained' onClick={handleClickComeBackHome}>
          {t('notFoundPage.go to back home')}
        </Button>
      </Stack>
    </Container>
  )
}

export default NotFoundPage
