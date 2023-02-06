import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CircleIcon from '@mui/icons-material/Circle'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, FormControl, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation(['defaultLayout', 'auth'])
  const navigate = useNavigate()
  return (
    <>
      <Box p='1rem' borderTop={'1px solid #000'}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Box>
              <Link to='/'>
                <img src='images/logo.png' alt='logo' />
              </Link>
            </Box>
            <Stack direction='row' spacing={1}>
              <LocalShippingIcon />
              <span>{t('ship')}</span>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CardGiftcardIcon />
              <span>{t('discount')} </span>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography
              variant='h3'
              fontSize={18}
              fontWeight='bold'
              paddingBottom={2}
              sx={{ textTransform: 'uppercase' }}
            >
              {t('contact')}
            </Typography>
            <Stack direction='row' spacing={1}>
              <HomeIcon />
              <Typography>{t('clownz store')}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocationOnIcon />
              <Typography>{t('address 1')}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocationOnIcon />
              <Typography>{t('address 2')}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <EmailIcon />
              <Typography>{t('address email')}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LocalPhoneIcon />
              <Typography>{t('phone 1')}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography variant='h3' fontSize={18} fontWeight='bold' paddingBottom={2}>
              {t('policy')}
            </Typography>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>{t('policy 1')}</Typography>
              </Link>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>{t('policy 2')}</Typography>
              </Link>
            </Stack>
            <Stack direction='row' spacing={1}>
              <CircleIcon />
              <Link to='/'>
                <Typography>{t('policy 3')}</Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} display='flex' flexDirection='column' gap={2}>
            <Typography variant='h3' fontSize={18} fontWeight='bold' paddingBottom={2}>
              {t('sign up for ')}
            </Typography>
            <Typography> {t('note')}</Typography>
            <FormControl component={'form'} sx={{ flexDirection: 'row' }}>
              <TextField id='register' label= {t("your email")}variant='outlined' />
              <Button variant='contained' color='success' sx={{ fontSize: '14px' }} size='small'>
                {t('auth:register.register')}
              </Button>
            </FormControl>
            <List sx={{ display: 'flex', gap: '1rem' }}>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src='images/payment_1.svg' alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src='images/payment_2.svg' alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src='images/payment_3.svg' alt='payment' />
                </Link>
              </ListItem>
              <ListItem disablePadding sx={{ width: 'auto' }}>
                <Link to='/'>
                  <img src='images/payment_4.svg' alt='payment' />
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Footer
