import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { useAppSelector } from '../hooks/hooks'

type Props = {
  children: ReactNode
}

export default function AuthCheck({ children }: Props) {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/')
  }, [isAuthenticated, router])

  return <>{children}</>
}
