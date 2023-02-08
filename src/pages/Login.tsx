import React, { useState, useEffect } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Box,
  FormControlLabel,
  Checkbox
} from '@mui/material'

import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from 'react-toastify'
import { FIRST } from '../constants/constants'
import { images } from '../assets'

const schema = yup
  .object()
  .shape({
    username: yup.string().required('Không bỏ trống'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      )
      .required('Không bỏ trống')
  })
  .required()

const Login: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const arrErr: any = Object.values(errors)
    if (arrErr.length > 0) {
      toast.error(arrErr[FIRST]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])

  const handleSignIn = (data: any) => {
    if (data.username === 'aaa') {
      return data;
    } else {
      toast.error('error user or password', {
        pauseOnHover: false
      })
    }
  }
  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container alignItems={'center'} m='8rem 0'>
          <Grid item md={6} display={matches900 ? 'block' : 'none'}>
            <img src={images.login} alt='login' style={{ width: '100%', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant={matches600 ? 'h2' : 'h3'} fontWeight={400} textAlign='center' mb={5}>
              Đăng nhập
            </Typography>
            <Stack component={'form'} alignItems='center' gap={3} onSubmit={handleSubmit(handleSignIn)}>
              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='username'
                    error={!!formState.errors?.username}
                    label='Tên đăng nhập'
                    variant='standard'
                    sx={{ width: '80%' }}
                  />
                )}
                name='username'
                control={control}
                defaultValue=''
              />
              <Controller
                render={({ field, formState }) => (
                  <FormControl sx={{ width: '80%' }} variant='standard'>
                    <InputLabel error={!!formState.errors.password} htmlFor='password'>
                      Mật khẩu
                    </InputLabel>
                    <Input
                      {...field}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      error={!!formState.errors.password}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
                name='password'
                control={control}
                defaultValue=''
              />

              <FormControlLabel control={<Checkbox />} label='Nhớ mật khẩu' sx={{ width: '80%' }} />
              <Button variant='contained' color='primary' size='large' type='submit' disabled={isSubmitting}>
                Đăng nhập
              </Button>
              <Box>
                Bạn chưa có tài khoản? <Link to={'/register'}>Tạo tài khoản</Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login
