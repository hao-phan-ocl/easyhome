import { useRouter } from 'next/router'
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAppDispatch } from '../../hooks/hooks'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { getProfile, loginSuccess } from '../../redux/features/authSlice'
import AuthCheck from '../../components/AuthCheck'

type LoginFormData = {
  firstName: string
  lastName: string
  email: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export default function AccountInfo() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: LoginFormData) {
    // try {
    //   const res = await instance.post(request('login', 'local'), {
    //     email: data.email,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //   })
    //   if (res.status === 201) {
    //     const { user, access_token } = res.data
    //     localStorage.setItem('accessToken', access_token)
    //     dispatch(loginSuccess())
    //     dispatch(getProfile())
    //     router.push('/account')
    //   }
    // } catch (error: any) {
    //   const message = error.response?.data.message
    //   if (message.includes('email')) setError('email', { message: message })
    //   if (message.includes('password'))
    //     setError('password', { message: message })
    // }
  }

  return (
    <AuthCheck>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4} maxWidth="500px" m="auto">
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
                  label="Email"
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
                  label="Password"
                  helperText={errors.lastName?.message}
                  type="password"
                  size="small"
                />
              )}
            />
          </Stack>
          <Stack gap={1}>
            <Typography color="primary" fontWeight={700}>
              Email:
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.email)}
                  label="Password"
                  helperText={errors.email?.message}
                  type="password"
                  size="small"
                />
              )}
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
