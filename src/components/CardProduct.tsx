import React from 'react'
import { Box, Typography, Stack, Button, Collapse, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import useToggle from '../hooks/useToggle'

const CardProduct = () => {
  const [open, handleToggle] = useToggle()
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches576 = useMediaQuery('(min-width:576px)')
  return (
    <>
      <Box position={'relative'} onMouseEnter={handleToggle} onMouseLeave={handleToggle}>
        <Link to='/product'>
          <img src='https://bizweb.dktcdn.net/thumb/large/100/414/728/products/13-3.jpg?v=1672389512000' alt='' />
        </Link>
        <Link to='/product'>
          <Typography variant='h5' p={'0.5rem 0'}>
            san pham 1
          </Typography>
        </Link>
        <Stack direction={'row'} gap={2} alignItems='flex-end'>
          <Typography fontSize='14px'>359000 vnd</Typography>
          <Typography fontSize='12px' fontStyle={'initial'} color='#ccc' sx={{ textDecoration: 'line-through' }}>
            399000 vnd
          </Typography>
        </Stack>
        {matches900 ? (
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
            sx={{
              position: 'absolute',
              bottom: 75,
              left: 0,
              right: 0
            }}
          >
            <Stack direction={'row'} justifyContent='space-between'>
              <Button variant='outlined'>Thêm giỏ hàng</Button>
              <Button variant='contained'>Mua ngay</Button>
            </Stack>
          </Collapse>
        ) : (
          <Stack
            direction={matches576 ? 'row' : 'column'}
            justifyContent='space-between'
            marginTop={1}
            gap={matches576 ? 0 : 1}
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
