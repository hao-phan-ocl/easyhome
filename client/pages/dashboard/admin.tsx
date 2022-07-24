import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppSelector } from '../../hooks/hooks'
import AdminTable from '../../components/Table/AdminTable'
import SnackBarSuccess from '../../components/SnackBar/SnackBarSuccess'
import SnackBarError from '../../components/SnackBar/SnackBarError'
import AccountNav from '../../components/Nav/AccountNav'

export default function Admin() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user?.role === 'USER') router.push('/')
  }, [user, router])

  return user?.role === 'USER' ? (
    <></>
  ) : (
    <>
      <AccountNav />
      <AdminTable />
      <SnackBarSuccess text="Role updated successfully!" />
      <SnackBarError text="Unauthorized! (Only ADMIN)" />
    </>
  )
}
