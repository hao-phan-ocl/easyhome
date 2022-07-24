import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch } from '../../hooks/hooks'
import {
  setSnackBarError,
  setSnackBarSuccess,
} from '../../redux/features/popUpSlice'
import { getAllUsers } from '../../redux/features/usersSlice'
import { User } from '../../types/schemas'

type Props = {
  user: User | null
  openDelUserDialog: boolean
  setDelUserDialog: Dispatch<SetStateAction<boolean>>
}

export default function DeleteUserDialog({
  user,
  openDelUserDialog,
  setDelUserDialog,
}: Props) {
  const dispatch = useAppDispatch()

  async function handleSubmit() {
    try {
      const res = await instance.delete<string>(
        request('users', 'delete', user?._id),
      )
      console.log(res)
      if (res.status === 200) {
        dispatch(setSnackBarSuccess(true))
        dispatch(getAllUsers())
        setDelUserDialog(false)
      }
    } catch (error) {
      dispatch(setSnackBarError(true))
    }
  }

  return (
    <Dialog
      open={openDelUserDialog}
      onClose={() => setDelUserDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack p="10px 0">
        <DialogTitle fontWeight={800} id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
  )
}
