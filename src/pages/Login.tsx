import React, { useState, useEffect, useMemo } from 'react'
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
  Box
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { login } from '../redux/slice/authSlice'

import { useAppDispatch, useAppSelector } from '../redux/hooks'

const Login: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)



  const { t } = useTranslation('auth')

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          email: yup.string().required(t('validation.email is required')).email(t('validation.wrong email format')),
          password: yup
            .string()
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            //   t('validation.wrong password format')
            // )
            .required(t('validation.password is required'))
        })
        .required(),
    []
  )

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
      toast.error(arrErr[0]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])

  const handleSignIn = (data: any) => {
    dispatch(login(data))
  }
  useEffect(() => {
    if (auth.tokenLogin) {
      toast.success(t('login.login success'))
      navigate('/')
    }
  }, [auth, navigate])

  useEffect(() => {
    document.title = t('login.login')
  }, [])

  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container alignItems={'center'} m={matches900 ? '10rem 0 4rem' : '6rem 0 2rem'}>
          <Grid item md={6} display={matches900 ? 'block' : 'none'}>
            <img src='images/login-register/login.jpeg' alt='login' style={{ width: '100%', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant={matches900 ? 'h2' : matches600 ? 'h3' : 'h4'}
              fontWeight={400}
              textAlign='center'
              mb={5}
            >
              {t('login.login')}
            </Typography>
            <Stack component={'form'} alignItems='center' gap={3} onSubmit={handleSubmit(handleSignIn)}>
              <Controller
                render={({ field, formState }) => (
                  <TextField
                    {...field}
                    id='email'
                    type={'email'}
                    error={!!formState.errors?.email}
                    label={t('login.email')}
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
                  <FormControl sx={{ width: '80%' }} variant='standard'>
                    <InputLabel error={!!formState.errors.password} htmlFor='password'>
                      {t('login.password')}
                    </InputLabel>
                    <Input
                      {...field}
                      autoComplete={'on'}
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

              <Button variant='contained' color='primary' size='large' type='submit' disabled={isSubmitting}>
                {t('login.login')}
              </Button>
              <Box>
                {t('login.not account')} <Link to={'/register'}>{t('login.create account')}</Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login
