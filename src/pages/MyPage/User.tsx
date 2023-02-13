import { Box, Container, Tab, Tabs, Typography, Stack, Avatar, useMediaQuery } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getUser } from '../../api/user.api'
import { useAppSelector } from '../../redux/hooks'
import { IUser } from '../../types/user.type'
import EditAccount from './EditAccount'
import HistoryOrder from './HistoryOrder'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const User = () => {
  const matches1200 = useMediaQuery('(min-width:1200px)')
  const matches900 = useMediaQuery('(min-width:900px)')
  const [value, setValue] = React.useState(0)
  const { t } = useTranslation(['page'])
  const auth = useAppSelector((state: any) => state.auth)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const getDataUser = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: auth.tokenLogin ? true : false
  })
  const dataUser: IUser = getDataUser.data?.user

  useEffect(() => {
    document.title = `${dataUser?.name} " | Clownz"`
  }, [dataUser])

  return (
    <Container maxWidth='xl'>
      <Box
        m={matches900 ? '8rem auto 4rem' : '6rem auto 4rem'}
        width={matches1200 ? '50%' : matches900 ? '70%' : '100%'}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' variant='scrollable'>
            <Tab label={t('userPage.personal information')} {...a11yProps(0)} />
            <Tab label={t('userPage.your account')} {...a11yProps(1)} />
            <Tab label={t('userPage.history')} {...a11yProps(2)} />
            <Tab label={t('userPage.discount')} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack justifyContent={'center'} alignItems='center' gap={2}>
            <Avatar></Avatar>
            <Typography fontStyle={'italic'}>{t('userPage.say hi')}</Typography>
            <Typography variant='h4'> {dataUser?.name}</Typography>
            <Typography>{dataUser?.profiles.dob || '--/--/--'}</Typography>
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditAccount />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <HistoryOrder />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1>{t('not function')}</h1>
        </TabPanel>
      </Box>
    </Container>
  )
}

export default User
