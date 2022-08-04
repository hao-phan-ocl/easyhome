import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useRouter } from 'next/router'
import { Dispatch, forwardRef, SetStateAction } from 'react'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'
import {
  openSnackBarError,
  openSnackBarSuccess,
  setSnackBarMsg,
} from '../../redux/features/popUpSlice'
import { getAllUsers } from '../../redux/features/usersSlice'
import SnackBarError from '../SnackBar/SnackBarError'
import SnackBarSuccess from '../SnackBar/SnackBarSuccess'

type Props = {
  userId: string | undefined
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function DeleteUserDialog({
  userId,
  openDialog,
  setOpenDialog,
}: Props) {
  const dispatch = useAppDispatch()
  const { snackBarMsg } = useAppSelector((state) => state.popUp)
  const { user } = useAppSelector((state) => state.auth)
  const router = useRouter()

  async function handleSubmit() {
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
      <Dialog
        TransitionComponent={Transition}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Stack p="10px 0">
          <DialogTitle fontWeight={800}>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This user will be deleted permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDialog(false)
              }}
              sx={{ marginRight: '7px' }}
              size="small"
            >
              Cancel
            </Button>
            <Button size="small" onClick={handleSubmit} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
      {snackBarMsg && <SnackBarError text={snackBarMsg} />}
      {snackBarMsg && <SnackBarSuccess text={snackBarMsg} />}
    </>
  )
}
