import { Button, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useAppSelector } from '../../hooks/hooks'
import logo from '../../public/logo.png'
import ProfileMenu from './ProfileMenu'

export default function NavBar() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Image
        style={{ cursor: 'pointer' }}
        src={logo}
        alt="Logo of Easyhome"
        width="100%"
        height="100%"
        onClick={() => router.push('/')}
      />

      <Stack direction="row" gap="20px">
        {!user ? (
          <>
            <Button onClick={() => router.push('/register')}>Register</Button>
            <Button onClick={() => router.push('/login')}>Log in</Button>
          </>
        ) : (
          <ProfileMenu user={user} />
        )}
      </Stack>
    </Stack>
  )
}
