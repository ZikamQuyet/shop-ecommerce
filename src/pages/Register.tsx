import React, { useEffect } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from 'react-toastify'

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Không bỏ trống họ và tên'),
    gender: yup.string().required('Không bỏ trống giới tính'),
    email: yup.string().email('Sai định dạng email').required('Không bỏ trống email'),

    username: yup.string().required('Không bỏ trống tên đăng nhập'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      )
      .required('Không bỏ trống mật khẩu'),
    password1: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      )
      .required('Không bỏ trống mật khẩu')
  })
  .required()

const Register: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const [showPassword1, setShowPassword1] = React.useState(false)

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show)

  const [showPassword2, setShowPassword2] = React.useState(false)

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show)

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
      toast.error(arrErr[0]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])

  const handleRegister = (data: any) => {
    if (data) {
      return data
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
            <img src='images/login-register/register.jpeg' alt='login' style={{ width: '100%', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant={matches600 ? 'h2' : 'h3'} fontWeight={400} textAlign='center' mb={5}>
              Đăng ký
            </Typography>
            <Stack component={'form'} alignItems='center' gap={3} onSubmit={handleSubmit(handleRegister)}>
              <Controller
                render={({ field, formState }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!formState.errors?.name}
                      label='Họ tên'
                      id='name'
                      variant='standard'
                      sx={{ width: '80%' }}
                    />
                  )
                }}
                name='name'
                control={control}
                defaultValue=''
              />

              <Controller
                render={({ field, formState }) => (
                  <FormControl sx={{ width: '80%' }}>
                    <FormLabel error={!!formState.errors?.gender} id='demo-radio-buttons-group-label'>
                      Giới tính
                    </FormLabel>
                    <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                      <FormControlLabel value='male' control={<Radio />} label='Nam' />
                      <FormControlLabel value='female' control={<Radio />} label='Nữ' />
                      <FormControlLabel value='other' control={<Radio />} label='Khác' />
                    </RadioGroup>
                  </FormControl>
                )}
                name='gender'
                control={control}
                defaultValue='male'
              />

              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    error={!!formState.errors?.email}
                    label='E-mail:'
                    type='email'
                    variant='standard'
                    sx={{ width: '80%' }}
                  />
                )}
                name='email'
                control={control}
                defaultValue=''
              />

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
                      error={!!formState.errors.password}
                      id='password'
                      type={showPassword1 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText sx={{ bgcolor: '#ccc', padding: '0.5rem', borderRadius: '0.5rem' }}>
                      Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ, số và các ký tự đặc biệt
                    </FormHelperText>
                  </FormControl>
                )}
                name='password'
                control={control}
                defaultValue=''
              />

              <Controller
                render={({ field, formState }) => (
                  <FormControl sx={{ width: '80%' }} variant='standard'>
                    <InputLabel error={!!formState.errors.password} htmlFor='password1'>
                      Xác nhận mật khẩu
                    </InputLabel>
                    <Input
                      error={!!formState.errors.password}
                      {...field}
                      id='password1'
                      type={showPassword2 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
                name='password1'
                control={control}
                defaultValue=''
              />

              <Button variant='contained' color='primary' size='large' type='submit'>
                Đăng nhập
              </Button>
              <Box>
                Bạn Đã Có Tài Khoản? <Link to={'/login'}> Đăng nhập ngay</Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Register
