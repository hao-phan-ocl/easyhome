import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import AdminTable from '../components/Table/AdminTable'
import SnackBarSuccess from '../components/SnackBar/SnackBarSuccess'
import SnackBarError from '../components/SnackBar/SnackBarError'
import {
  setSnackBarError,
  setSnackBarSuccess,
} from '../redux/features/popUpSlice'

export default function Admin() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user?.role === 'USER') router.push('/')

    // router.asPath => SnackBar will turn off
    // whenever router changes
    dispatch(setSnackBarSuccess(false))
    dispatch(setSnackBarError(false))
  }, [user, router.asPath, router, dispatch])

  return user?.role === 'USER' ? (
    <></>
  ) : (
    <>
      <AdminTable />
      <SnackBarSuccess text="Role updated successfully!" />
      <SnackBarError text="Unauthorized! (Only ADMIN)" />
    </>
  )
}
