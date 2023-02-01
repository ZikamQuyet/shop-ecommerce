
import { List, ListItem, Stack, Button, Box, Typography, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import Count from '../../components/Count'

const CartMini = () => {
  const navigate = useNavigate()
  return (
    <Box p={1}>
      <List
        sx={{
          borderBottom: '1px dashed #000',
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 200,
          '& ul': { padding: 0 }
        }}
        disablePadding
      >
        <ListItem
          disablePadding
          alignItems='flex-start'
          sx={{ gap: '1rem', justifyContent: 'space-between', padding: '0.5rem 0 ' }}
        >
          <Link to='/product'>
            <img
              src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
              alt=''
              style={{ height: '80px', width: 'auto', objectFit: 'cover' }}
            />
          </Link>
          <Box>
            <Link to='/product'>Tên sản phẩm 1</Link>
            <Typography fontSize={'12px'} fontStyle='italic'>
              666666 vnđ
            </Typography>
            <Stack direction={'row'} gap={'2px'}>
              <Button variant='outlined' sx={{ minWidth: 0, padding: 0 }}>
                <RemoveIcon />
              </Button>

              <Box p='0 8px' border={'1px solid #000'} borderRadius={1}>
                1
              </Box>

              <Button variant='outlined' size='small' sx={{ minWidth: 0, padding: 0 }}>
                <AddIcon />
              </Button>
            </Stack>
          </Box>
          <Button sx={{ minWidth: 0, padding: 0 }}>
            <CloseIcon />
          </Button>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          alignItems='flex-start'
          sx={{ gap: '1rem', justifyContent: 'space-between', padding: '0.5rem 0 ' }}
        >
          <Link to='/product'>
            <img
              src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
              alt=''
              style={{ height: '80px', width: 'auto', objectFit: 'cover' }}
            />
          </Link>
          <Box>
            <Link to='/product'>Tên sản phẩm 1</Link>
            <Typography fontSize={'12px'} fontStyle='italic'>
              666666 vnđ
            </Typography>
            <Count />
          </Box>
          <Button sx={{ minWidth: 0, padding: 0 }}>
            <CloseIcon />
          </Button>
        </ListItem>
        <Divider />

        <ListItem
          disablePadding
          alignItems='flex-start'
          sx={{ gap: '1rem', justifyContent: 'space-between', padding: '0.5rem 0 ' }}
        >
          <Link to='/product'>
            <img
              src='https://bizweb.dktcdn.net/100/414/728/products/6-3-7c2546b3-a5ee-487a-b2bc-8d789c60d549.jpg?v=1672280798087'
              alt=''
              style={{ height: '80px', width: 'auto', objectFit: 'cover' }}
            />
          </Link>
          <Box>
            <Link to='/product'>Tên sản phẩm 1</Link>
            <Typography fontSize={'12px'} fontStyle='italic'>
              666666 vnđ
            </Typography>
            <Stack direction={'row'} gap={'2px'}>
              <Button variant='outlined' sx={{ minWidth: 0, padding: 0 }}>
                <RemoveIcon />
              </Button>

              <Box p='0 8px' border={'1px solid #000'} borderRadius={1}>
                1
              </Box>

              <Button variant='outlined' size='small' sx={{ minWidth: 0, padding: 0 }}>
                <AddIcon />
              </Button>
            </Stack>
          </Box>
          <Button sx={{ minWidth: 0, padding: 0 }}>
            <CloseIcon />
          </Button>
        </ListItem>
        <Divider />
      </List>
      <Stack direction={'row'} justifyContent='space-between' margin={'1rem 0'}>
        <Typography>Tổng cộng:</Typography>
        <Typography color={'secondary'}>199999 vnđ</Typography>
      </Stack>
      <Stack direction={'row'} gap={1} justifyContent='space-between'>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/payment')
          }}
        >
          Thanh toán
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/cart')
          }}
        >
          Giỏ hàng
        </Button>
      </Stack>
    </Box>
  )
}

export default CartMini
