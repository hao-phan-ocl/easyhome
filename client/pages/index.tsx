import type { NextPage } from 'next'
import { useEffect } from 'react'

import Logout from '../components/button/Logout'
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

  return (
    <>
      {user && <h1>Welcome {user.email}</h1>}
      <Logout />
    </>
  )
}

export default Home
