import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CircleIcon from '@mui/icons-material/Circle'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import { Link } from 'react-router-dom'
import { Box, Button, FormControl, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import { images } from '../assets'

const Footer = () => {
  return (
    <>
      <Box p='1rem' borderTop={'1px solid #000'}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Box>
              <Link to='/'>
                <img src={images.logo} alt='logo' />
              </Link>
            </Box>
            <Stack direction='row' spacing={1}>
              <LocalShippingIcon />
              <span>Ship COD toàn quốc</span>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CardGiftcardIcon />
              <span>FREESHIP đơn hàng từ 700.000đ </span>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography variant='h3' fontSize={18} fontWeight='bold' paddingBottom={2}>
              LIÊN HỆ
            </Typography>
            <Stack direction='row' spacing={1}>
              <HomeIcon />
              <Typography>CLOWNZ STORE</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocationOnIcon />
              <Typography>45 Núi Trúc, Ba Đình, HN</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocationOnIcon />
              <Typography>19 Hồ Đắc Di, Đống Đa, HN</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <EmailIcon />
              <Typography>duong@clownz.vn</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocalPhoneIcon />
              <Typography>058660 8660</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography variant='h3' fontSize={18} fontWeight='bold' paddingBottom={2}>
              CHÍNH SÁCH
            </Typography>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>CHÍNH SÁCH THÀNH VIÊN</Typography>
              </Link>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>CHÍNH SÁCH ĐỔI TRẢ</Typography>
              </Link>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>CHÍNH SÁCH VẬN CHUYỂN</Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography variant='h3' fontSize={18} fontWeight='bold' paddingBottom={2}>
              ĐĂNG KÝ NHẬN TIN
            </Typography>
            <Typography>Nhận thông tin sản phẩm mới nhất, tin khuyến mãi và nhiều hơn nữa.</Typography>
            <FormControl component={'form'} sx={{ flexDirection: 'row' }}>
              <TextField id='register' label='Email của bạn' variant='outlined' />
              <Button variant='contained' color='success' sx={{ fontSize: '14px' }} size='small'>
                Đăng ký
              </Button>
            </FormControl>
            <List sx={{ display: 'flex', gap: '1rem' }}>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src={images.payment1} alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src={images.payment2} alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src={images.payment3} alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src={images.payment4} alt='payment' />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Footer
