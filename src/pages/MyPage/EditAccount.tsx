import * as yup from 'yup'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useMemo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { FIRST } from '../../constants/constants'
import { getUser, updateUser } from '../../api/user.api'
import { IDateUpdateUser, IUser } from '../../types/user.type'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../redux/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

const EditAccount = () => {
  const { t } = useTranslation(['page'])

  const schema = useMemo(
    () =>
      yup
        .object()
        .shape({
          name: yup.string().required(t('auth:validation.name is required')),
          numberPhone: yup
            .string()
            .required(t('auth:validation.phone is required'))
            .matches(
              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              t('auth:validation.phone error')
            ),
          address: yup.string().required(t('auth:validation.address is required')),
          gender: yup.string().required()
        })
        .required(),
    []
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const auth = useAppSelector((state) => state.auth)

  const getDataUser = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: auth.tokenLogin ? true : false
  })
  const dataUser: IUser = getDataUser.data?.user

  const [valueTime, setValueTime] = React.useState<Dayjs | null>(dayjs(dataUser.profiles.dob || '2014-08-18T21:11:54'))

  const handleChange = (newValueTime: Dayjs | null) => {
    setValueTime(newValueTime)
  }

  const { mutate } = useMutation({
    mutationFn: (body: IDateUpdateUser) => updateUser(body)
  })
  const handleUpdateUser = (data: any) => {
    const dataUpdate: IDateUpdateUser = {
      name: data.name,
      numberPhone: data.numberPhone,
      address: data.address,
      gender: data.gender,
      dob: dayjs(valueTime).format()
    }

    mutate(dataUpdate, {
      onSuccess: () => {
        toast.success(t('userPage.update success'))
      },
      onError: () => toast.error(t('userPage.update error'))
    })
  }
  useEffect(() => {
    const arrErr: any = Object.values(errors)
    if (arrErr.length > 0) {
      toast.error(arrErr[FIRST]?.message, {
        pauseOnHover: false
      })
    }
  }, [errors])
  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack gap={3} component='form' onSubmit={handleSubmit(handleUpdateUser)}>
          <Controller
            render={({ field, formState }) => (
              <TextField
                {...field}
                id='name'
                error={!!formState.errors?.name}
                label={t('auth:register.name')}
                variant='standard'
              />
            )}
            name='name'
            control={control}
            defaultValue={dataUser.name || ''}
          />

          <Controller
            render={({ field, formState }) => (
              <TextField
                {...field}
                id='numberPhone'
                error={!!formState.errors?.numberPhone}
                label={t('auth:register.phone')}
                variant='standard'
              />
            )}
            name='numberPhone'
            control={control}
            defaultValue={dataUser.profiles.numberPhone || ''}
          />
          <Controller
            render={({ field, formState }) => (
              <TextField
                {...field}
                id='address'
                error={!!formState.errors?.address}
                label={t('auth:register.address')}
                variant='standard'
              />
            )}
            name='address'
            control={control}
            defaultValue={dataUser.profiles.address || ''}
          />
          <Controller
            render={({ field, formState }) => (
              <FormControl sx={{ width: '80%' }}>
                <FormLabel error={!!formState.errors?.payment} id='demo-radio-buttons-group-label'>
                  {t('userPage.gender')}
                </FormLabel>
                <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
                  <FormControlLabel value='male' control={<Radio />} label={t('userPage.male')} />
                  <FormControlLabel value='female' control={<Radio />} label={t('userPage.female')} />
                  <FormControlLabel value='other' control={<Radio />} label={t('userPage.other')} />
                </RadioGroup>
              </FormControl>
            )}
            name='gender'
            control={control}
            defaultValue='male'
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={t('userPage.dob')}
              inputFormat='MM/DD/YYYY'
              value={valueTime}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Box>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              {t('userPage.update')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default EditAccount
