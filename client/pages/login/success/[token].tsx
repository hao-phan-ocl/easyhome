import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppDispatch } from '../../../hooks/hooks'

export default function Token() {
  const router = useRouter()
  const { token } = router.query
  const dispatch = useAppDispatch()

  if (token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token as string)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 500)
  }, [dispatch, token])

  return <h1>Logged in successfully</h1>
}
