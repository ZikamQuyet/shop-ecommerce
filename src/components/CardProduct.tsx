import React from 'react'
import { Box, Typography, Stack, Button, Collapse, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import useToggle from '../hooks/useToggle'
import { IProduct } from '../constants/dataFakeProducts'
import { convertPrice } from '../utils/convertPrice'
import { BASE_URL_IMAGE, FIRST } from '../constants/constants'
interface ICardProduct {
  data: any
}
const CardProduct: React.FC<ICardProduct> = ({ data }) => {
  const [open, handleToggle] = useToggle()

  const matches680 = useMediaQuery('(min-width:680px)')
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches1200 = useMediaQuery('(min-width:1200px)')
  // console.log('data', data.images[3].created_at)
  // return null
  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <>
      <Box position={'relative'} onMouseEnter={handleToggle} onMouseLeave={handleToggle} onClick={handleToTop}>
        <Link to={`/product/${data.id}`}>
          <Box height={matches1200 ? 480 : matches680 ? 380 : 240}>
            <img
              src={`${BASE_URL_IMAGE}${data.images[FIRST].product_img}`}
              alt='image-product'
              style={{ height: '100%' }}
            />
          </Box>
        </Link>
        <Link to={`/product/${data.id}`}>
          <Typography
            variant={matches680 ? 'h5' : 'h6'}
            p={'0.5rem 0'}
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {data.name}
          </Typography>
        </Link>
        <Stack
          direction={matches680 ? 'row' : 'column'}
          gap={matches680 ? 2 : 0}
          alignItems={matches680 ? 'flex-end' : 'unset'}
        >
          <Typography fontSize='14px'>{convertPrice(data.price)}</Typography>
          <Typography fontSize='12px' fontStyle={'initial'} color='#ccc' sx={{ textDecoration: 'line-through' }}>
            {convertPrice(data.price)}
          </Typography>
        </Stack>
        {matches900 ? (
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
            sx={{
              position: 'absolute',
              bottom: 70,
              left: 0,
              right: 0
            }}
          >
            <Stack direction={'row'} justifyContent='space-between'>
              <Button variant='contained'>Thêm giỏ hàng</Button>
              <Button variant='contained'>Mua ngay</Button>
            </Stack>
          </Collapse>
        ) : (
          <Stack
            direction={matches680 ? 'row' : 'column'}
            justifyContent='space-between'
            marginTop={1}
            gap={matches680 ? 0 : 1}
          >
            <Button variant='outlined'>Thêm giỏ hàng</Button>
            <Button variant='contained'>Mua ngay</Button>
          </Stack>
        )}
      </Box>
    </>
  )
}

export default CardProduct
