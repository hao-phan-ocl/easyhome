import { Stack } from '@mui/material'

import LoginForm from '../../components/Form/LoginForm'
import { useAppSelector } from '../../hooks/hooks'

export default function LoginPage() {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <Stack maxWidth="500px" m="auto">
      {user && <>Hello {user.email}</>}
      <LoginForm />
    </Stack>
  )
}
