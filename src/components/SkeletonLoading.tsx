import React from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'
import { images } from '../assets'

const SkeletonLoading: React.FC = () => {
  return (
    <>
      <Stack height={'100vh'} alignItems='center' justifyContent={'center'} gap={2}>
        <Box width={'100px'} height={'100px'}>
          <img src={images.logo1} alt='logo' />
        </Box>
        <CircularProgress color='inherit' />
      </Stack>
    </>
  )
}

export default SkeletonLoading
