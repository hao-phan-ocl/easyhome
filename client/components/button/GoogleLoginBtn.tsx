import { Button, Stack } from '@mui/material'
import Image from 'next/image'

import google from '../../public/google.svg'
import { useAppDispatch } from '../../hooks/hooks'
import { getProfile, loginSuccess } from '../../redux/features/authSlice'

export default function GoogleLogin() {
  const dispatch = useAppDispatch()

  function googleLogin() {
    const newWindow = window.open(
      'http://localhost:5000/login/google',
      '_blank',
      'width=400, height=500',
    )

    if (newWindow) {
      // setInterval for every 0.5s until newWindow is closed
      let timer: NodeJS.Timer = setInterval(() => {
        if (newWindow.closed) {
          dispatch(loginSuccess())
          dispatch(getProfile())
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  return (
    <Button variant="outlined" onClick={googleLogin}>
      <Stack direction="row" gap={2}>
        <Image src={google} alt="Google Button" />
        Continue with Google
      </Stack>
    </Button>
  )
}
