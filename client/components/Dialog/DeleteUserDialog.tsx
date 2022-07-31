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
import { Dispatch, forwardRef, SetStateAction, useState } from 'react'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'
import {
  setSnackBarError,
  setSnackBarSuccess,
} from '../../redux/features/popUpSlice'
import { getAllUsers } from '../../redux/features/usersSlice'
import SnackBarError from '../SnackBar/SnackBarError'

type Props = {
  userId: string | undefined
  openDelUserDialog: boolean
  setDelUserDialog: Dispatch<SetStateAction<boolean>>
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
  openDelUserDialog,
  setDelUserDialog,
}: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [errText, setErrText] = useState('')

  async function handleSubmit() {
    try {
      const res = await instance.delete<string>(
        request('users', 'delete', userId),
      )
      if (res.status === 200) {
        dispatch(setSnackBarSuccess(true))
        setDelUserDialog(false)

        if (router.pathname === '/admin') {
          dispatch(getAllUsers())
        }

        if (router.pathname !== '/admin') {
          localStorage.clear()
          dispatch(logout()) // set isAuthenticated = false
        }
      }
    } catch (error: any) {
      dispatch(setSnackBarError(true))
      setErrText(error.response.data.message)
    }
  }

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={openDelUserDialog}
        onClose={() => setDelUserDialog(false)}
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
              onClick={() => setDelUserDialog(false)}
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
      <SnackBarError text={errText} />
    </>
  )
}
