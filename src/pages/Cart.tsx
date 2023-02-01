import { Box, Button, Container, Divider, Grid, List, ListItem, Stack, Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import Count from '../components/Count'

const Cart = () => {
  const navigate = useNavigate()
  return (
    <>
      <Container maxWidth='xl'>
        <Box m={'8rem 0'}>
          <Stack direction={'row'} alignItems='flex-end' gap={1}>
            <Typography variant='h3'>Giỏ hàng</Typography>
            <Typography component={'span'}>(3 sản phẩm)</Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={8}>
              <List disablePadding>
                <ListItem disablePadding alignItems='center' sx={{ gap: '5rem', padding: '0.5rem 0 ' }}>
                  <Link to='/product'>
                    <img
                      src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
                      alt=''
                      style={{ height: '150px', width: 'auto', objectFit: 'cover' }}
                    />
                  </Link>
                  <Stack gap={1}>
                    <Link to='/product'>Tên sản phẩm 1</Link>
                    <Button variant='outlined'>Xóa</Button>
                  </Stack>
                  <Typography color={'secondary'} fontWeight={500}>
                    666666 vnđ
                  </Typography>
                  <Count />
                </ListItem>
                <Divider />
                <ListItem disablePadding alignItems='center' sx={{ gap: '5rem', padding: '0.5rem 0 ' }}>
                  <Link to='/product'>
                    <img
                      src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
                      alt=''
                      style={{ height: '150px', width: 'auto', objectFit: 'cover' }}
                    />
                  </Link>
                  <Stack gap={1}>
                    <Link to='/product'>Tên sản phẩm 1</Link>
                    <Button variant='outlined'>Xóa</Button>
                  </Stack>
                  <Typography color={'secondary'} fontWeight={500}>
                    666666 vnđ
                  </Typography>
                  <Count />
                </ListItem>
                <Divider />
                <ListItem disablePadding alignItems='center' sx={{ gap: '5rem', padding: '0.5rem 0 ' }}>
                  <Link to='/product'>
                    <img
                      src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
                      alt=''
                      style={{ height: '150px', width: 'auto', objectFit: 'cover' }}
                    />
                  </Link>
                  <Stack gap={1}>
                    <Link to='/product'>Tên sản phẩm 1</Link>
                    <Button variant='outlined'>Xóa</Button>
                  </Stack>
                  <Typography color={'secondary'} fontWeight={500}>
                    666666 vnđ
                  </Typography>
                  <Count />
                </ListItem>
                <Divider />
              </List>
            </Grid>

            <Grid item xs={12} md={4} display='flex' gap={1} flexDirection='column'>
              <Stack direction={'row'} justifyContent='space-between'>
                <Typography>Tạm tính:</Typography>
                <Typography fontWeight={'500'}>199999 vnđ</Typography>
              </Stack>
              <Divider />
              <Stack direction={'row'} justifyContent='space-between'>
                <Typography>Thành tiền:</Typography>
                <Typography fontWeight={'500'} variant='h6' color={'secondary'}>
                  199999 vnđ
                </Typography>
              </Stack>

              <Button variant='contained'>Thanh toán ngay</Button>
              <Button
                variant='outlined'
                onClick={() => {
                  navigate('/collections')
                }}
              >
                Tiếp tục mua hàng
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Cart
