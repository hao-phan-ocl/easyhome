import { Stack } from '@mui/material'
import Head from 'next/head'

import LoginForm from '../../components/MyForm/LoginForm'
import { useAppSelector } from '../../hooks/hooks'

export default function LoginPage() {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <Stack maxWidth="500px" m="auto">
      <Head>
        <title>Account Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user && <>Hello {user.email}</>}
      <LoginForm />
    </Stack>
  )
}
