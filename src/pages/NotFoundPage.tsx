import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { images } from '../assets'

const NotFoundPage = () => {
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
          <Typography variant='h3'>Oops! Trang bạn tìm kiếm không tồn tại.</Typography>
          <Typography>Website mới nâng cấp, do đó có một số link có thể được thay đổi.</Typography>
          <Typography>Bạn vui lòng trở lại trang chủ, thử tìm kiếm với từ khóa khác hoặc tiếp tục mua sắm!</Typography>
        </Stack>
        <Button variant='contained' onClick={handleClickComeBackHome}>
          Quay lại trang chủ
        </Button>
      </Stack>
    </Container>
  )
}

export default NotFoundPage
