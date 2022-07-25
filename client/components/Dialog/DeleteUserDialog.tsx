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
import { Dispatch, forwardRef, SetStateAction } from 'react'

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

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

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
  )
}
