import ButtonCustom from '../components/ButtonCustom'
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
  PaginationItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material'
import { getCategories, getCategory } from '../api/categories.api'
import { getProducts } from '../api/product.api'
import { getProductsSearch } from '../api/search.api'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useQueryString } from '../hooks/useQueryString'
import { useTranslation } from 'react-i18next'
import { ICategories, IProduct } from '../types/product.type'

const Collections: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')

  const { t } = useTranslation(['page'])

  const openCategory = useToggle()
  const openOther = useToggle()

  // get id category
  const { params } = useParams()

  const [pagePagination, setPagePagination] = useState(1)
  // get page từ domain
  const queryString = useQueryString()
  const page = Number(queryString.page) || 1
  const paramSearch = queryString.param

  useEffect(() => {
    setPagePagination(page)
  }, [page])
  // get data categories
  const getDataCategories = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const { data, isLoading } =
    params === 'search'
      ? useQuery({
          queryKey: ['productsSearch', paramSearch],
          queryFn: () => getProductsSearch(paramSearch)
        })
      : params
      ? useQuery({
          queryKey: ['category', params, page],
          queryFn: () => getCategory(Number(params), page)
        })
      : useQuery({
          queryKey: ['products', page],
          queryFn: () => getProducts(page)
        })

  const dataCategories: ICategories[] = getDataCategories.data?.data

  const totalPage = data?.data.last_page

  const products: IProduct[] = data?.data.data

  useEffect(() => {
    document.title = t('collectionPage.all products')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
      {isLoading && <SkeletonLoading />}
      {!isLoading && (
        <Stack m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
          <Stack direction={'row'} justifyContent='space-between'>
            <Box
              onMouseEnter={openCategory.handleOpen}
              onMouseLeave={openCategory.handleClose}
              onClick={openCategory.handleToggle}
              sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              <Stack direction='row' justifyContent={'space-between'} p={2}>
                <Typography>{t('collectionPage.categories')}</Typography>
                <ButtonCustom bgColor='none' border='none' padding={'0'}>
                  {openCategory.isOpen ? <ExpandLess /> : <ExpandMore />}
                </ButtonCustom>
              </Stack>
              {!getDataCategories.isLoading && (
                <Collapse
                  in={openCategory.isOpen}
                  timeout='auto'
                  unmountOnExit
                  sx={{
                    position: 'absolute',
                    top: 40,
                    left: `${matches900 ? '1rem' : '0px'}`,
                    width: `${matches900 ? 'unset' : '100vw'}`,
                    bgcolor: '#fff',
                    boxShadow: 5,
                    borderRadius: 1,
                    zIndex: '99'
                  }}
                >
                  <List component='div' disablePadding>
                    {dataCategories.map((category: ICategories) => (
                      <ListItem key={category.id}>
                        <Link to={`/collections/${category.id}`} style={{ width: '100%' }}>
                          <Typography>{category.title}</Typography>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <Stack
                direction='row'
                justifyContent={'space-between'}
                p={2}
                sx={{ cursor: 'pointer' }}
                onClick={openOther.handleToggle}
              >
                <Typography>{t('collectionPage.search')}</Typography>
                {openOther.isOpen ? <ExpandLess /> : <ExpandMore />}
              </Stack>

              <Collapse
                in={openOther.isOpen}
                timeout='auto'
                unmountOnExit
                sx={{
                  position: 'absolute',
                  top: 40,
                  right: `${matches900 ? '1rem' : '0px'}`,
                  width: `${matches900 ? 'unset' : '100vw'}`,
                  bgcolor: '#fff',
                  boxShadow: 5,
                  borderRadius: 1,
                  zIndex: '99'
                }}
              >
                <Box p={1}>{t('not function')}</Box>
              </Collapse>
            </Box>
          </Stack>
          {data && (
            <Grid container p={2} spacing={5}>
              {products.map((product: IProduct) => (
                <Grid item xs={6} md={4} xl={3} key={product.id}>
                  <CardProduct dataProduct={product} />
                </Grid>
              ))}
            </Grid>
          )}
          {!data && <SkeletonLoading />}

          <Stack spacing={2} m='2rem auto'>
            <Pagination
              count={totalPage}
              shape='rounded'
              page={pagePagination}
              renderItem={(item) => <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />}
            />
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default Collections
