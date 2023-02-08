import CardProduct from '../components/CardProduct'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import SkeletonLoading from '../components/SkeletonLoading'
import useToggle from '../hooks/useToggle'
import {
  Box,
  Collapse,
  Grid,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  PaginationItem,
  Link as LinkMUI
} from '@mui/material'
import { getProducts } from '../api/product'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '../hooks/useQueryString'

const Collections = () => {
  const matches900 = useMediaQuery('(min-width:900px)')

  const [openCategory, handleToggleCategory] = useToggle()
  const [openOther, handleToggleOther] = useToggle()

  const [pagePagination, setPagePagination] = useState(1)

  useEffect(() => {
    document.title = 'Tất cả sản phẩm'
  }, [])

  const queryString = useQueryString()
  const page = Number(queryString.page) || 1

  const { data, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts(page)
  })

  const totalPage = data?.data.last_page

  const products = data?.data.data

  const handleChangePagePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setPagePagination(value)
  }
  return (
    <>
      {isLoading && <SkeletonLoading />}
      {!isLoading && (
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
          {data && (
            <Grid container p={2} spacing={5}>
              {products.map((product: any) => (
                <Grid item xs={6} md={4} xl={3} key={product.id}>
                  <CardProduct data={product} />
                </Grid>
              ))}
            </Grid>
          )}
          {!data && <SkeletonLoading />}

          <Stack spacing={2} m='2rem auto'>
            {/* <Link to={`?page=${pagePagination}`}> */}
            <Pagination
              count={totalPage}
              shape='rounded'
              page={pagePagination}
              onChange={handleChangePagePagination}
              renderItem={(item) => <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />}
            />
            {/* </Link> */}
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Collections
