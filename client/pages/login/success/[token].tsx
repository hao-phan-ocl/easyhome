import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getProfile } from '../../../redux/features/authSlice'

export default function Token() {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token as string)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 500)
  }, [])

  return <h1>Logged in successfully</h1>
}
