import { List, ListItem, Stack, Button, Box, Typography, Divider, Skeleton, useMediaQuery } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import Count from '../../components/Count'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { BASE_URL_IMAGE } from '../../constants/constants'
import { convertPrice } from '../../utils/convertPrice'
import { getTotal, getTotalPriceItem } from '../../utils/getTotal'
import { decrementQuantity, incrementQuantity, removeItem } from '../../redux/slice/cartSlice'
import { ICart } from '../../types/cart.type'
import { useState } from 'react'
import ModalCustom from '../../components/ModalCustom'
import useToggle from '../../hooks/useToggle'
import ModalConfirm from '../../components/ModalConfirm'

interface ICartMini {
  handleCloseCartMini: () => void
}
const CartMini: React.FC<ICartMini> = ({ handleCloseCartMini = () => {} }) => {
  const matches600 = useMediaQuery('(min-width:600px)')
  const { t } = useTranslation(['defaultLayout'])
  const [isLoadingImg, setIsLoadingImg] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)
  const dataCart: ICart[] = cart.cart

  const openConfirm = useToggle()

  return (
    <>
      {dataCart.length !== 0 && (
        <Box p={1} width={matches600 ? '345px' : 'unset'}>
          <List
            sx={{
              borderBottom: '1px dashed #000',
              position: 'relative',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: '12.5rem',
              '& ul': { padding: 0 }
            }}
            disablePadding
          >
            {dataCart.map((item: ICart) => (
              <Box key={item.id}>
                <ListItem
                  disablePadding
                  alignItems='flex-start'
                  sx={{ justifyContent: 'space-between', padding: '0.5rem 0', gap: '1rem' }}
                >
                  <Box width={'30%'}>
                    <Link to={`/product/${item.id}`} onClick={handleCloseCartMini}>
                      <Box height={'6.25rem'}>
                        {!isLoadingImg && <Skeleton sx={{ height: '6.25rem', width: '100%', transform: 'unset' }} />}
                        <img
                          src={`${BASE_URL_IMAGE}${item.img}`}
                          alt=''
                          style={{ height: '100%' }}
                          onLoad={() => {
                            setIsLoadingImg(true)
                          }}
                        />
                      </Box>
                    </Link>
                  </Box>

                  <Box width={'50%'}>
                    <Link to={`/product/${item.id}`} onClick={handleCloseCartMini}>
                      <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {item.name}
                      </Typography>
                    </Link>
                    <Stack direction='row' gap={2}>
                      {item.size && (
                        <Typography fontSize={'12px'} fontStyle='italic'>
                          size: {item.size}
                        </Typography>
                      )}
                      {item.color && (
                        <Stack direction='row' gap={1}>
                          <Typography fontSize={'12px'} fontStyle='italic'>
                            màu sắc:
                          </Typography>
                          <Box
                            width='1rem'
                            height='1rem'
                            bgcolor={item.color}
                            display='inline-block'
                            border={'0.5px solid #ccc'}
                          />
                        </Stack>
                      )}
                    </Stack>

                    <Typography>{convertPrice(getTotalPriceItem(item.price, item.quantity))}</Typography>
                    <Count
                      decrement={() => {
                        dispatch(decrementQuantity({ id: item.id, color: item.color, size: item.size }))
                      }}
                      increment={() => dispatch(incrementQuantity({ id: item.id, color: item.color, size: item.size }))}
                      quantity={item.quantity}
                    />
                  </Box>
                  <Box width={'10%'}>
                    <Button sx={{ minWidth: 0, padding: 0 }} onClick={openConfirm.handleOpen}>
                      <CloseIcon />
                    </Button>
                    <ModalConfirm
                      open={openConfirm.isOpen}
                      handleClose={() => {
                        openConfirm.handleClose()
                      }}
                      handleCloseCartMini={() => handleCloseCartMini()}
                      handleConfirm={() => dispatch(removeItem({ id: item.id, color: item.color, size: item.size }))}
                    />
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
          <Stack direction={'row'} justifyContent='space-between' margin={'1rem 0'}>
            <Typography>{t('total')}</Typography>
            <Typography color={'secondary'}>{convertPrice(getTotal(dataCart).totalPrice)}</Typography>
          </Stack>
          <Stack direction={'row'} gap={1} justifyContent='space-between'>
            <Button
              variant='contained'
              onClick={() => {
                navigate('/order')
                handleCloseCartMini()
              }}
            >
              {t('payment')}
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                navigate('/cart')
                handleCloseCartMini()
              }}
            >
              {t('cart')}
            </Button>
          </Stack>
        </Box>
      )}
      {!dataCart.length && (
        <Box p={2}>
          <Typography fontSize={12} fontStyle='italic'>
            Không có sản phẩm
          </Typography>
        </Box>
      )}
    </>
  )
}

export default CartMini
