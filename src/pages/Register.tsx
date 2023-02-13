import React, { useEffect, useMemo } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { toast } from 'react-toastify'
import { FIRST } from '../constants/constants'
import { images } from '../assets'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { register } from '../redux/slice/authSlice'
import { useTranslation } from 'react-i18next'
import { IAuth } from '../types/auth.type'

const Register: React.FC = () => {
  const matches900 = useMediaQuery('(min-width:900px)')
  const matches600 = useMediaQuery('(min-width:600px)')

  const navigate = useNavigate()
  const { t } = useTranslation('auth')

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          name: yup.string().required(t('validation.name is required')),
          email: yup.string().email(t('validation.wrong email format')).required(t('validation.email is required')),
          password: yup
            .string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              t('validation.wrong password format')
            ),
          passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], t('validation.passwords must match'))
        })
        .required(),
    []
  )

  const [showPassword1, setShowPassword1] = React.useState<boolean>(false)

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show)

  const [showPassword2, setShowPassword2] = React.useState<boolean>(false)

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onSubmit',
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

  const dispatch = useAppDispatch()
  const auth: IAuth = useAppSelector((state: any) => state.auth)

  const handleRegister = (data: any) => {
    dispatch(register(data))
  }

  useEffect(() => {
    if (auth.tokenRegister) {
      toast.success(t('register.register success'))
      navigate('/login')
    }
  }, [auth, navigate])
  useEffect(() => {
    document.title = t('register.register')
  }, [])

  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container alignItems={'center'} m={matches900 ? '8rem 0 4rem' : '6rem 0 4rem'}>
          <Grid item md={6} display={matches900 ? 'block' : 'none'}>
            <img src={images.register} alt='login' style={{ width: '100%', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant={matches600 ? 'h2' : 'h3'} fontWeight={400} textAlign='center' mb={5}>
              {t('register.register')}
            </Typography>
            <Stack component={'form'} alignItems='center' gap={3} onSubmit={handleSubmit(handleRegister)}>
              <Controller
                render={({ field, formState }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!formState.errors?.name}
                      label={t('register.name')}
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
                  <TextField
                    {...field}
                    error={!!formState.errors?.email}
                    label={t('login.email')}
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
                  <FormControl sx={{ width: '80%' }} variant='standard'>
                    <InputLabel error={!!formState.errors.password} htmlFor='password'>
                      {t('login.password')}
                    </InputLabel>
                    <Input
                      {...field}
                      autoComplete={'on'}
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
                      {t('register.note password')}
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
                    <InputLabel error={!!formState.errors.passwordConfirmation} htmlFor='password1'>
                      {t('register.confirm password')}
                    </InputLabel>
                    <Input
                      autoComplete={'on'}
                      error={!!formState.errors.passwordConfirmation}
                      {...field}
                      id='passwordConfirmation'
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
                name='passwordConfirmation'
                control={control}
                defaultValue=''
              />

              <Button variant='contained' color='primary' size='large' type='submit' disabled={isSubmitting}>
                {t('register.register')}
              </Button>
              <Box>
                {t('register.do you already have an account')}
                <Link to={'/login'}> {t('register.login now')}</Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Register
