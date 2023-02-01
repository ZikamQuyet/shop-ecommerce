import { Box, Container, Tab, Tabs, Typography, Stack, Avatar } from '@mui/material'
import React from 'react'
import EditAccount from './EditAccount'

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
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ width: '100%' }} m={'8rem 0'}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' variant='scrollable'>
            <Tab label='Thông tin cá nhân' {...a11yProps(0)} />
            <Tab label='Tài khoản của bạn' {...a11yProps(1)} />
            <Tab label='Lịch sử mua hàng' {...a11yProps(2)} />
            <Tab label='Ưu đãi của bạn' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack justifyContent={'center'} alignItems='center' gap={2}>
            <Avatar></Avatar>
            <Typography fontStyle={'italic'}>Xin chào</Typography>
            <Typography variant='h4'>User1</Typography>
            <Typography>15/04/2023</Typography>
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditAccount />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1>Chưa có chức năng này</h1>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <h1>Chưa có chức năng này</h1>
        </TabPanel>
      </Box>
    </Container>
  )
}

export default User
