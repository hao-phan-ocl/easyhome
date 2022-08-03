import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppSelector } from '../hooks/hooks'
import AdminTable from '../components/Table/AdminTable'
import SnackBarSuccess from '../components/SnackBar/SnackBarSuccess'
import SnackBarError from '../components/SnackBar/SnackBarError'

export default function Admin() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user?.role === 'USER' || !isAuthenticated) router.push('/')
  }, [user, router, isAuthenticated])

  return (
    <>
      <AdminTable />
      <SnackBarSuccess text="Successful!" />
      <SnackBarError text="Unauthorized! (Only ADMIN)" />
    </>
  )
}
