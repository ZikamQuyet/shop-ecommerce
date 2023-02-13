import ButtonCustom from '../../components/ButtonCustom'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import useToggle from '../../hooks/useToggle'
import { Collapse, List, ListItem, Stack, Typography } from '@mui/material'
import { getCategories } from '../../api/categories.api'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ICategories } from '../../types/product.type'

interface IMenuCustom {
  isMobile?: boolean
}
const MenuCustom: React.FC<IMenuCustom> = ({ isMobile }) => {
  const matches1536 = useMediaQuery('(min-width:1536px)')
  const matches1200 = useMediaQuery('(min-width:1200px)')

  const { t } = useTranslation(['defaultLayout', 'auth'])

  const open = useToggle()

  const getDataCategories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })
  const dataCategories: ICategories[] = getDataCategories.data?.data

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
            onMouseEnter={open.handleOpen}
            onMouseLeave={open.handleClose}
            onClick={open.handleToggle}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Stack width={'100%'} direction='row' justifyContent={'space-between'}>
              <Link to='/collections' style={{ width: '100%', textAlign: `${isMobile ? 'unset' : 'center'}` }}>
                <Typography>{t('product')}</Typography>
              </Link>
              <ButtonCustom bgColor='none' border='none' onClick={open.handleToggle} padding={'0'}>
                {open.isOpen ? <ExpandLess /> : <ExpandMore />}
              </ButtonCustom>
            </Stack>

            <Collapse
              in={open.isOpen}
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
                      boxShadow: 5,
                      borderRadius: 1
                    }
              }
            >
              {!getDataCategories.isLoading && (
                <List component='div' disablePadding>
                  {dataCategories.map((category: any) => (
                    <ListItem key={category.id}>
                      <Link to={`/collections/${category.id}`} style={{ width: '100%' }}>
                        <Typography>{category.title}</Typography>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}
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
