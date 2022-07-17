import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Token() {
  const router = useRouter()
  const { token } = router.query

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
