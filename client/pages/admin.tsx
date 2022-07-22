import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppSelector } from '../hooks/hooks'
import AdminTable from '../components/Table/AdminTable'
import MySnackBar from '../components/MySnackBar'

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
      <AdminTable />
      <MySnackBar text="Role updated successfully!" />
    </>
  )
}
