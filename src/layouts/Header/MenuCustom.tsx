import React from 'react'
import { List, ListItem, Typography, Collapse, Stack } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ButtonCustom from '../../components/ButtonCustom'
import useToggle from '../../hooks/useToggle'

import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface IMenuCustom {
  isMobile?: boolean
}
const MenuCustom: React.FC<IMenuCustom> = ({ isMobile }) => {
  const matches1536 = useMediaQuery('(min-width:1536px)')
  const matches1200 = useMediaQuery('(min-width:1200px)')
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const { t } = useTranslation(['defaultLayout','auth'])
  const navigate = useNavigate()

  const [open, handleToggle] = useToggle()
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={`${isMobile ? 'unset' : 'center'}`}
        borderBottom={`${isMobile ? 'unset' : '1px solid #000'}`}
      >
        <List
          sx={
            !isMobile
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  width: `${matches1536 ? '45%' : matches1200 ? '60%' : '80%'}`
                }
              : { width: '100%' }
          }
          disablePadding
        >
          <ListItem>
            <Link to='/' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
              <Typography>{t('home')}</Typography>
            </Link>
          </ListItem>
          <ListItem
            onMouseEnter={handleToggle}
            onMouseLeave={handleToggle}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stack width={'100%'} direction='row' justifyContent={'space-between'}>
              <Link to='/collections' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
                <Typography>{t('product')}</Typography>
              </Link>
              <ButtonCustom bgColor='none' border='none' onClick={handleToggle} padding={'0'}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ButtonCustom>
            </Stack>

            <Collapse
              in={open}
              timeout='auto'
              unmountOnExit
              sx={
                isMobile
                  ? { width: '100%' }
                  : {
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 40,
                      bgcolor: '#fff',
                      boxShadow: 24,
                      borderRadius: 1
                    }
              }
            >
              <List component='div' disablePadding>
                <ListItem>
                  <Link to='/collections' style={{ width: '100%' }}>
                    <Typography>{t('top')}</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/collections' style={{ width: '100%' }}>
                    <Typography>{t('bottom')}</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/collections' style={{ width: '100%' }}>
                    <Typography>{t('accessory')}</Typography>
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>

          <ListItem>
            <Link to='/' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
              <Typography>{t('blog')}</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to='/' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
              <Typography>{t('about us')}</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to='/' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
              <Typography>{t('contact')}</Typography>
            </Link>
          </ListItem>
        </List>
      </Stack>
    </>
  )
}

export default MenuCustom
