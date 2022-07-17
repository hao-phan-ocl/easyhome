import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import GoogleButton from '../components/GoogleButton'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getProfile } from '../redux/features/authSlice'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    }
  }, [dispatch, isAuthenticated])

  async function googleLogin() {
    const newWindow = window.open(
      'http://localhost:5000/login/google',
      '_blank',
      'width=400, height=500',
    )

    if (newWindow) {
      // setInterval for every 0.5s until newWindow is closed
      let timer: NodeJS.Timer = setInterval(() => {
        if (newWindow.closed) {
          dispatch(getProfile())
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  return (
    <>
      <button onClick={googleLogin}>Google Login</button>
      {user && <h1>Welcome {user.email}</h1>}
    </>
  )
}

export default Home
