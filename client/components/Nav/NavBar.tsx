import { Button, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useAppSelector } from '../../hooks/hooks'
import logo from '../../public/logo.png'
import HamburgerMenu from '../Button/HamburgerMenu'

import ProfileMenu from './ProfileMenu'
import SubNav from './SubNav'

export default function NavBar() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <Stack
      direction="row"
      justifyContent={{
        xs: 'center',
        sm: 'center',
        md: 'space-between',
        lg: 'space-between',
      }}
      alignItems="center"
    >
      <HamburgerMenu />
      <Image
        priority
        style={{ cursor: 'pointer' }}
        src={logo}
        alt="Logo of Easyhome"
        width="100%"
        height="100%"
        onClick={() => router.push('/')}
      />

      <Stack
        direction="row"
        gap="20px"
        display={{ xs: 'none', sm: 'none', md: 'flex' }}
      >
        {!user ? (
          <>
            <Button onClick={() => router.push('/register')}>Register</Button>
            <Button onClick={() => router.push('/login')}>Log in</Button>
          </>
        ) : (
          <>
            <SubNav />
            <ProfileMenu user={user} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
