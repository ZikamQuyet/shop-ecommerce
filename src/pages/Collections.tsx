import {
  Box,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import useToggle from '../hooks/useToggle'
import Card from '../components/CardProduct'

const Collections = () => {
  const [openCategory, handleToggleCategory] = useToggle()
  const [openOther, handleToggleOther] = useToggle()
  const matches900 = useMediaQuery('(min-width:900px)')
  return (
    <Stack marginTop={matches900 ? '8rem' : '4rem'}>
      <Stack direction={'row'} justifyContent='space-between'>
        <Box
          onMouseEnter={handleToggleCategory}
          onMouseLeave={handleToggleCategory}
          sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
        >
          <Stack direction='row' justifyContent={'space-between'} p={2}>
            <Typography>Danh mục</Typography>
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </Stack>

          <Collapse
            in={openCategory}
            timeout='auto'
            unmountOnExit
            sx={{
              position: 'absolute',
              top: 40,
              left: `${matches900 ? '16px' : '0px'}`,
              width: `${matches900 ? 'unset' : '100vw'}`,
              bgcolor: '#fff',
              boxShadow: 5,
              borderRadius: 1,
              zIndex: '99'
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
        <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Stack
            direction='row'
            justifyContent={'space-between'}
            p={2}
            sx={{ cursor: 'pointer' }}
            onClick={handleToggleOther}
          >
            <Typography>Tìm theo</Typography>
            {openOther ? <ExpandLess /> : <ExpandMore />}
          </Stack>

          <Collapse
            in={openOther}
            timeout='auto'
            unmountOnExit
            sx={{
              position: 'absolute',
              top: 40,
              right: `${matches900 ? '16px' : '0px'}`,
              width: `${matches900 ? 'unset' : '100vw'}`,
              bgcolor: '#fff',
              boxShadow: 5,
              borderRadius: 1,
              zIndex: '99'
            }}
          >
            <Box p={1}>chưa có chức năng này</Box>
          </Collapse>
        </Box>
      </Stack>
      <Grid container p={2} spacing={5}>
        <Grid item xs={6} md={4} xl={3}>
          <Card />
        </Grid>
        <Grid item xs={6} md={4} xl={3}>
          <Card />
        </Grid>
        <Grid item xs={6} md={4} xl={3}>
          <Card />
        </Grid>
        <Grid item xs={6} md={4} xl={3}>
          <Card />
        </Grid>
      </Grid>

      <Stack spacing={2} m='2rem auto'>
        <Pagination count={10} shape='rounded' />
      </Stack>
    </Stack>
  )
}

export default Collections
