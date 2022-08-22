import { Stack } from '@mui/material'
import Head from 'next/head'

import RegisterForm from '../components/Form/RegisterForm'

export default function RegisterPage() {
  return (
    <Stack maxWidth="500px" m="auto">
      <Head>
        <title>Account Registration</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RegisterForm />
    </Stack>
  )
}
