import ButtonCustom from '../../components/ButtonCustom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MenuCustom from './MenuCustom'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  Grid,
  List,
  ListItem,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import useToggle from '../../hooks/useToggle'
import CartMini from './CartMini'
import { images } from '../../assets'

const styleModalSearch = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
}

const Header: React.FC = () => {
  const matches1536 = useMediaQuery('(min-width:1536px)')
  const matches1200 = useMediaQuery('(min-width:1200px)')
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const [openModalSearch, handleToggleModalSearch] = useToggle()
  const [openMenuMobile, handleToggleMenuMobile] = useToggle()
  const [openUser, handleToggleUser] = useToggle()
  const [openCart, handleToggleCart] = useToggle()

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
                  <span>Địa chỉ: Việt Nam</span>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                  <LocalPhoneIcon />
                  <span>SĐT: 01234567890</span>
                </Stack>
              </>
            ) : (
              <>
                <ButtonCustom bgColor='none' border='none' onClick={handleToggleMenuMobile}>
                  <MenuIcon />
                </ButtonCustom>
                <Modal open={openMenuMobile} onClose={handleToggleMenuMobile}>
                  <Box
                    sx={{
                      position: 'fixed',
                      top: 0,
                      bottom: 0,
                      width: `${matches600 ? '30%' : '50%'}`,
                      bgcolor: '#fff'
                    }}
                  >
                    <MenuCustom isMobile={true}></MenuCustom>
                  </Box>
                </Modal>
              </>
            )}
          </Grid>
          <Grid item xs={4} xl={6} display='flex' justifyContent='center'>
            <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
              <img src={images.logo} alt='logo' />
            </Link>
          </Grid>
          <Grid item xs={4} xl={3} display='flex' justifyContent='right' alignItems='center' gap={matches600 ? 3 : 1}>
            <ButtonCustom padding='0' bgColor='none' border='none' onClick={handleToggleModalSearch}>
              <SearchIcon />
            </ButtonCustom>

            <Modal
              open={openModalSearch}
              onClose={handleToggleModalSearch}
              // aria-labelledby='modal-modal-title'
              // aria-describedby='modal-modal-description'
            >
              <Box sx={styleModalSearch} display='flex' justifyContent='center' gap={1}>
                <form action=''>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <TextField variant='outlined' size='small' />
                    <ButtonCustom padding='0' bgColor='none' border='none'>
                      <SearchIcon />
                    </ButtonCustom>
                  </Stack>
                </form>
              </Box>
            </Modal>

            <Box onMouseEnter={handleToggleUser} onMouseLeave={handleToggleUser}>
              <Box onClick={handleToggleUser} sx={{ cursor: 'pointer' }}>
                <PersonIcon />
              </Box>
              <Collapse
                in={openUser}
                timeout='auto'
                unmountOnExit
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 45,
                  bgcolor: '#fff',
                  zIndex: 99,
                  left: matches600 ? 'unset' : 0,
                  boxShadow: 24,
                  borderRadius: 1
                }}
              >
                <List component='div' disablePadding>
                  <ListItem>
                    <Link
                      to='/user'
                      // underline='none'
                      // width={'100%'}
                      // display='flex'
                      // justifyContent={'space-between'}
                      // alignItems='center'
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Avatar></Avatar>
                      User1
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      to='/login'
                      // underline='none' width={'100%'}
                    >
                      <Typography>Đăng nhập</Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      to='/login'
                      // underline='none' width={'100%'}
                    >
                      <Typography>Đăng Xuất</Typography>
                    </Link>
                  </ListItem>
                </List>
              </Collapse>
            </Box>

            <Box onMouseEnter={handleToggleCart} onMouseLeave={handleToggleCart}>
              <Badge badgeContent={2} color='primary' onClick={handleToggleCart}>
                <ShoppingCartIcon sx={{ cursor: 'pointer' }} />
              </Badge>
              <Collapse
                in={openCart}
                timeout='auto'
                unmountOnExit
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 45,
                  bgcolor: '#fff',
                  zIndex: 99,
                  left: matches600 ? 'unset' : 0,
                  boxShadow: 24,
                  borderRadius: 1
                }}
              >
                <CartMini />
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
