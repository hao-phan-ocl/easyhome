import { Button, Stack } from '@mui/material'
import Image from 'next/image'

import { useAppSelector } from '../../hooks/hooks'
import logo from '../../public/logo.png'
import LoginMenu from './LoginMenu'

export default function NavBar() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Image src={logo} alt="Logo of Easyhome" width="100%" height="100%" />
      <Stack direction="row" gap="20px">
        <Button>Register</Button>
        {!user ? (
          <LoginMenu />
        ) : (
          <Button>{user?.firstName + ' ' + user.lastName}</Button>
        )}
      </Stack>
    </Stack>
  )
}
