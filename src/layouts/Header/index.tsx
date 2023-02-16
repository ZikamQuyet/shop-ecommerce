import ButtonCustom from '../../components/ButtonCustom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuCustom from './MenuCustom'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  Drawer,
  Grid,
  List,
  ListItem,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import useToggle from '../../hooks/useToggle'
import CartMini from './CartMini'
import { images } from '../../assets'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useTranslation } from 'react-i18next'
import Divider from '@mui/material/Divider'
import { useQuery } from '@tanstack/react-query'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getUser } from '../../api/user.api'
import { getTotal } from '../../utils/getTotal'
import ModalCustom from '../../components/ModalCustom'
import { IUser } from '../../types/user.type'
import { IAuth } from '../../types/auth.type'
import { ICart } from '../../types/cart.type'

const Header: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const { t } = useTranslation(['defaultLayout', 'auth'])
  const navigate = useNavigate()

  const auth: IAuth = useAppSelector((state) => state.auth)
  const cart = useAppSelector((state) => state.cart)
  const dataCart: ICart[] = cart.cart

  const openModalSearch = useToggle()
  const openUser = useToggle()
  const openCart = useToggle()

  const [state, setState] = React.useState({
    left: false
  })
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, ['left']: open })
  }

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          search: yup.string().required('hãy điền tên sản phẩm')
        })
        .required(),
    []
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const handleSearch = (data: any) => {
    openModalSearch.handleClose()
    navigate(`/collections/search?param=${data.search.toUpperCase()}`)
    reset()
  }
  const getDataUser = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: auth.tokenLogin ? true : false
  })
  const dataUser: IUser = getDataUser.data?.user
  return (
    <Box position='fixed' top={0} left={0} right={0} bgcolor='#fff' zIndex={999}>
      {/* header top */}
      <Box p='1rem' borderBottom={`${matches900 ? 'unset' : '1px solid #000'}`}>
        <Grid container>
          <Grid item xs={4} xl={3} display='flex' gap={2} fontSize='14px'>
            {matches900 ? (
              <>
                <Stack direction='row' alignItems='center' gap={1}>
                  <LocationOnIcon />
                  <span>{t('address')}</span>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                  <LocalPhoneIcon />
                  <span>{t('phone')}</span>
                </Stack>
              </>
            ) : (
              <>
                <ButtonCustom bgColor='none' border='none' onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </ButtonCustom>

                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer(false)} sx={{ width: '50%' }}>
                  <MenuCustom isMobile={true} toggleDrawer={toggleDrawer(false)} />
                </Drawer>
              </>
            )}
          </Grid>
          <Grid item xs={4} xl={6} display='flex' justifyContent='center'>
            <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={images.logo} alt='logo' />
            </Link>
          </Grid>
          <Grid item xs={4} xl={3} display='flex' justifyContent='right' alignItems='center' gap={matches600 ? 3 : 1}>
            <ButtonCustom padding='0' bgColor='none' border='none' onClick={openModalSearch.handleToggle}>
              <SearchIcon />
            </ButtonCustom>

            <ModalCustom
              open={openModalSearch.isOpen}
              handleClose={() => {
                reset()
                openModalSearch.handleToggle()
              }}
            >
              <form action='' onSubmit={handleSubmit(handleSearch)}>
                <Stack direction='row' alignItems='center' gap={1}>
                  <Controller
                    render={({ field, formState }) => (
                      <TextField
                        {...field}
                        id='search'
                        error={!!formState.errors?.search}
                        label={'Tìm kiếm'}
                        variant='outlined'
                        size='small'
                        sx={{ width: '80%' }}
                      />
                    )}
                    name='search'
                    control={control}
                    defaultValue=''
                  />
                  <ButtonCustom padding='0' bgColor='none' border='none' type='submit' disabled={isSubmitting}>
                    <SearchIcon />
                  </ButtonCustom>
                </Stack>
              </form>
            </ModalCustom>
            <Box onMouseEnter={openUser.handleOpen} onMouseLeave={openUser.handleClose}>
              <Box sx={{ cursor: 'pointer' }} onClick={openUser.handleToggle}>
                <PersonIcon />
              </Box>
              <Collapse
                in={openUser.isOpen}
                timeout='auto'
                unmountOnExit
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 45,
                  bgcolor: '#fff',
                  zIndex: 99,
                  left: matches600 ? 'unset' : 0,
                  boxShadow: 5,
                  borderRadius: 1
                }}
              >
                <List component='div' disablePadding onClick={openUser.handleClose}>
                  {/* login/register */}
                  {auth.tokenLogin ? (
                    <>
                      <ListItem>
                        <Link
                          to='/user'
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Stack direction='row' gap={2} alignItems='center'>
                            <Avatar></Avatar>
                            {dataUser?.name}
                          </Stack>
                        </Link>
                      </ListItem>
                      <Divider />
                      <ListItem
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          localStorage.removeItem('persist:root')
                          navigate('/')
                          window.location.reload()
                        }}
                      >
                        <Typography>{t('logout')}</Typography>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <Typography fontStyle={'italic'} fontWeight={300} fontSize={12}>
                          {t('not account')}
                        </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <Link to='/login' onClick={openUser.handleToggle}>
                          <Typography>{t('auth:login.login')}</Typography>
                        </Link>
                      </ListItem>
                    </>
                  )}
                </List>
              </Collapse>
            </Box>

            <Box onMouseEnter={openCart.handleOpen} onMouseLeave={openCart.handleClose}>
              {/* hiển thị số lượng cart ở đây */}
              <Badge
                badgeContent={getTotal(dataCart).totalQuantity || '0'}
                color='primary'
                onClick={openCart.handleToggle}
              >
                <ShoppingCartIcon sx={{ cursor: 'pointer' }} />
              </Badge>
              <Collapse
                in={openCart.isOpen}
                timeout='auto'
                unmountOnExit
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 45,
                  bgcolor: '#fff',
                  zIndex: 99,
                  left: matches600 ? 'unset' : 0,
                  boxShadow: 5,
                  borderRadius: 1
                }}
              >
                <CartMini handleCloseCartMini={openCart.handleClose} />
              </Collapse>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* header bottom */}

      {matches900 && <MenuCustom></MenuCustom>}
    </Box>
  )
}

export default Header
