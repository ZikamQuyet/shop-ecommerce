import React, { useEffect, useState } from 'react'
import useToggle from '../hooks/useToggle'
import { addToCart } from '../redux/slice/cartSlice'
import { BASE_URL_IMAGE, FIRST } from '../constants/constants'
import { Box, Button, Collapse, Stack, Typography, useMediaQuery } from '@mui/material'
import { convertPrice } from '../utils/convertPrice'
import { Link, useNavigate } from 'react-router-dom'
import { realPrice } from '../utils/realPrice'
import { useAppDispatch } from '../redux/hooks'
import { useTranslation } from 'react-i18next'
import { TCardProduct } from '../types/product.type'
import Skeleton from '@mui/material/Skeleton'
import SkeletonLoading from './SkeletonLoading'
interface ICardProduct {
  dataProduct: TCardProduct
}
const CardProduct: React.FC<ICardProduct> = ({ dataProduct }) => {
  const open = useToggle()
  const navigate = useNavigate()
  const { t } = useTranslation(['page'])

  const [isLoadingImg, setIsLoadingImg] = useState(false)

  const matches680 = useMediaQuery('(min-width:680px)')
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches1200 = useMediaQuery('(min-width:1200px)')

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: dataProduct.id,
        name: dataProduct.name,
        price: realPrice(+dataProduct.price, +dataProduct.discount),
        img: dataProduct.images[FIRST].product_img
        // color: 'black'
        // color: data.colors[FIRST].value_name,
        // size: data.sizes[FIRST].value_name
      })
    )
  }
  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: dataProduct.id,
        name: dataProduct.name,
        price: realPrice(+dataProduct.price, +dataProduct.discount),
        img: dataProduct.images[FIRST].product_img
        // color: data.colors[FIRST].value_name,
        // size: data.sizes[FIRST].value_name
      })
    )
    navigate('/cart')
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  return (
    <>
      <Box position={'relative'} onMouseEnter={open.handleOpen} onMouseLeave={open.handleClose}>
        <Link to={`/product/${dataProduct.id}`}>
          <Box height={matches1200 ? 480 : matches680 ? 380 : 240}>
            {!isLoadingImg && <Skeleton sx={{ height: '100%', transform: 'unset' }} />}
            <img
              src={`${BASE_URL_IMAGE}${dataProduct.images[FIRST].product_img}`}
              alt='image-product'
              style={{ height: '100%' }}
              onLoad={() => setIsLoadingImg(true)}
            />
          </Box>
        </Link>
        <Link to={`/product/${dataProduct.id}`}>
          <Typography
            variant={matches680 ? 'h5' : 'h6'}
            p={'0.5rem 0'}
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {dataProduct.name}
          </Typography>
        </Link>
        <Stack
          direction={matches680 ? 'row' : 'column'}
          gap={matches680 ? 2 : 0}
          alignItems={matches680 ? 'flex-end' : 'unset'}
        >
          <Typography fontSize='14px'>{convertPrice(realPrice(+dataProduct.price, +dataProduct.discount))}</Typography>
          {dataProduct.discount !== 0 && (
            <Typography fontSize='12px' fontStyle={'initial'} color='#ccc' sx={{ textDecoration: 'line-through' }}>
              {convertPrice(dataProduct.price)}
            </Typography>
          )}
        </Stack>
        {matches900 ? (
          <Collapse
            in={open.isOpen}
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
              <Button variant='contained' onClick={handleAddToCart}>
                {t('add cart')}
              </Button>
              <Button variant='contained' onClick={handleBuyNow}>
                {t('buy now')}
              </Button>
            </Stack>
          </Collapse>
        ) : (
          <Stack
            direction={matches680 ? 'row' : 'column'}
            justifyContent='space-between'
            marginTop={1}
            gap={matches680 ? 0 : 1}
          >
            <Button variant='outlined'>{t('add cart')}</Button>
            <Button variant='contained'>{t('buy now')}</Button>
          </Stack>
        )}
      </Box>
    </>
  )
}

export default CardProduct
