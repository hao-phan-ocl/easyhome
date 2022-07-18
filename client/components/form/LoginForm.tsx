import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAppDispatch } from '../../hooks/hooks'
import GoogleLogin from '../button/GoogleLogin'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { loginSuccess } from '../../redux/features/authSlice'

type LoginFormData = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await instance.post(request('login', 'local'), {
        email: data.email,
        password: data.password,
      })
      if (res.status === 201) {
        const { user, access_token } = res.data
        localStorage.setItem('accessToken', access_token)
        dispatch(loginSuccess())
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
        <Typography color="primary">Log in with Google</Typography>
        <GoogleLogin />
        <Divider>OR</Divider>
        <Typography color="primary">Log in with your email address</Typography>
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
          Login
        </Button>
      </Stack>
    </form>
  )
}
