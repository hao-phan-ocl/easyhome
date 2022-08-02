import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import axios from 'axios'
import * as yup from 'yup'

import { useAppSelector } from '../../hooks/hooks'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import AuthCheck from '../../components/AuthCheck'
import { Country } from '../../types/schemas'

type ProfileForm = {
  firstName: string
  lastName: string
  gender: string
  country: string
  avatar: FileList | string
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required()

export default function AccountInfo() {
  const { user } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const [countries, setCountries] = useState<Country[]>([])

  const {
    control,
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    mode: 'onBlur',
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      gender: user?.gender ?? '',
      country: user?.country ?? '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (user) reset(user) // reset form defaulValues when refreshing page

    async function getCountries() {
      const res = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(res.data)
    }

    getCountries()
  }, [reset, user])

  async function onSubmit(data: ProfileForm) {
    try {
      const res = await instance.put(
        request('users', 'update-profile', user?._id),
        {
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          gender: data.gender,
        },
      )

      let uploadAvatar
      if (typeof data.avatar !== 'string') {
        const formData = new FormData()
        formData.append('image', data.avatar[0])

        uploadAvatar = await instance.put(
          request('users', 'upload-avatar', user?._id),
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
      }
      if (res.status === 200 || uploadAvatar?.status === 200) {
        router.push('/account')
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <AuthCheck>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4} maxWidth="500px" m="auto">
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              Avatar:
            </Typography>
            <input
              {...register('avatar')}
              accept="image/*"
              type="file"
              title="Upload file"
              name="avatar"
            />
          </Stack>
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              First name:
            </Typography>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              Last name:
            </Typography>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              Gender:
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  sx={{
                    width: '100%',
                  }}
                >
                  <FormControlLabel
                    value={'male'}
                    control={<Radio size="small" />}
                    label="male"
                  />
                  <FormControlLabel
                    value={'female'}
                    control={<Radio size="small" />}
                    label="female"
                  />
                </RadioGroup>
              )}
            />
          </Stack>
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              Country:
            </Typography>
            <Controller
              name="country"
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(_, data) => {
                    onChange(data?.name.common)
                    console.log(value)
                  }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.name.common}
                  renderOption={(props, option) => (
                    <Stack direction="row" component="li" gap={2} {...props}>
                      <Image
                        loading="lazy"
                        width={25}
                        height={20}
                        src={option.flags.svg}
                        alt="flag"
                      />
                      {option.name.common} ({option.altSpellings[0]})
                    </Stack>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      size="small"
                    />
                  )}
                />
              )}
              control={control}
            />
          </Stack>
          <Stack gap={1}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => router.push('/account')} variant="outlined">
              Back
            </Button>
          </Stack>
        </Stack>
      </form>
    </AuthCheck>
  )
}
