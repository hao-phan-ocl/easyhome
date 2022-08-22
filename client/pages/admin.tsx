import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'

import { useAppSelector } from '../hooks/hooks'
import AdminTable from '../components/Table/AdminTable'

export default function Admin() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user?.role === 'USER' || !isAuthenticated) router.push('/')
  }, [user, router, isAuthenticated])

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminTable />
    </>
  )
}
