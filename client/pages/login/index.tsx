import { Stack } from '@mui/material'
import Head from 'next/head'

import LoginForm from '../../components/Form/LoginForm'

export default function LoginPage() {
  return (
    <Stack maxWidth="500px" m="auto">
      <Head>
        <title>Account Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginForm />
    </Stack>
  )
}
