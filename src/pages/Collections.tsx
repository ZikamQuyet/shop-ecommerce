import { Box, Collapse, Container, Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import useToggle from '../hooks/useToggle'

const Collections = () => {
  const [open, handleToggle] = useToggle()
  const matches900 = useMediaQuery('(min-width:900px)')
  return (
    <Box m={matches900 ? '8rem 0' : '4rem 0'}>
      <Stack direction={'row'} justifyContent='space-between'>
        <Box
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
        >
          <Stack direction='row' justifyContent={'space-between'} p={2}>
            <Typography>Danh mục</Typography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Stack>

          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
            sx={{
              position: 'absolute',
              top: 40,
              left: `${matches900 ? '16px' : '0px'}`,
              width: `${matches900 ? 'unset' : '100vw'}`,
              bgcolor: '#fff',
              boxShadow: 5,
              borderRadius: 1
            }}
          >
            <List component='div' disablePadding>
              <ListItem>
                <Link to='/collections' style={{ width: '100%' }}>
                  <Typography>Top</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to='/collections' style={{ width: '100%' }}>
                  <Typography>Bottom</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to='/collections' style={{ width: '100%' }}>
                  <Typography>ACCESSORY</Typography>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>
        <Box p={2}>Tìm theo</Box>
      </Stack>
      <Grid container p={1}>
        <Grid item xs={6} md={4} lg={3}></Grid>
      </Grid>
    </Box>
  )
}

export default Collections
