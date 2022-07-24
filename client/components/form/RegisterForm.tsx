import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAppDispatch } from '../../hooks/hooks'
import GoogleLoginBtn from '../Button/GoogleLoginBtn'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { getProfile, loginSuccess } from '../../redux/features/authSlice'
import { useRouter } from 'next/router'

type LoginFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const router = useRouter()
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
      password: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await instance.post(request('users', 'register'), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
      if (res.status === 201) {
        const { user, access_token } = res.data
        localStorage.setItem('accessToken', access_token)
        dispatch(loginSuccess())
        dispatch(getProfile())
        router.push('/dashboard/account')
      }
    } catch (error: any) {
      const message = error.response?.data.message
      if (message.includes('email')) setError('email', { message: message })
      if (message.includes('password'))
        setError('password', { message: message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} p="15px">
        <Typography color="primary" fontWeight={700}>
          Register with Google:
        </Typography>
        <GoogleLoginBtn />
        <Divider>OR</Divider>
        <Typography color="primary" fontWeight={700}>
          Register with your email address:
        </Typography>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.firstName)}
              label="First name"
              helperText={errors.firstName?.message}
              // fullWidth
              size="small"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.lastName)}
              label="Last name"
              helperText={errors.lastName?.message}
              // fullWidth
              size="small"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.email)}
              label="Email"
              helperText={errors.email?.message}
              // fullWidth
              size="small"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.password)}
              label="Password"
              helperText={errors.password?.message}
              type="password"
              // fullWidth
              size="small"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Stack>
    </form>
  )
}
