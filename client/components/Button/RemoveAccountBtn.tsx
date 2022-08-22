import { useState } from 'react'
import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useRouter } from 'next/router'

import { logout } from '../../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getAllUsers } from '../../redux/features/usersSlice'
import DeleteDialog from '../Dialog/DeleteDialog'
import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import {
  openSnackBarError,
  openSnackBarSuccess,
  setSnackBarMsg,
} from '../../redux/features/popUpSlice'

type Props = {
  userId?: string
}

export default function RemoveAccountBtn({ userId }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  async function handleDelete() {
    try {
      const res = await instance.delete<string>(
        request('users', 'delete', userId),
      )
      if (res.status === 200) {
        dispatch(openSnackBarSuccess(true))
        setOpenDialog(false)
        dispatch(setSnackBarMsg('User deleted!'))

        if (router.pathname === '/admin') {
          dispatch(getAllUsers())
          if (userId === user?._id) {
            localStorage.clear()
            dispatch(logout()) // set isAuthenticated = false
          }
        }

        if (router.pathname !== '/admin') {
          localStorage.clear()
          dispatch(logout()) // set isAuthenticated = false
        }
      }
    } catch (error: any) {
      dispatch(openSnackBarError(true))
      dispatch(setSnackBarMsg(error.response.data.message))
    }
  }

  return (
    <>
      <Button
        size="small"
        color="secondary"
        startIcon={<DeleteOutlineIcon />}
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        Remove account
      </Button>
      <DeleteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDelete={handleDelete}
      />
    </>
  )
}
