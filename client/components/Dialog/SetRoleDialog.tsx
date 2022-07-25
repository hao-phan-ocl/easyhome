import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  Stack,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, useEffect, useState } from 'react'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  setDialog,
  setSnackBarError,
  setSnackBarSuccess,
} from '../../redux/features/popUpSlice'
import { getAllUsers } from '../../redux/features/usersSlice'
import { User } from '../../types/schemas'

type Props = {
  user: User | null
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function SetRoleDialog({ user }: Props) {
  const dispatch = useAppDispatch()
  const { openDialog } = useAppSelector((state) => state.popUp)
  const options = ['USER', 'MODERATOR']
  const [currentRole, setCurrentRole] = useState<string>('')

  useEffect(() => {
    if (user) setCurrentRole(user.role)
  }, [user])

  function handleClose() {
    dispatch(setDialog(false))
  }

  async function handleSubmit() {
    try {
      const res = await instance.put<string>(
        request('users', 'set-role', user?._id),
        {
          role: currentRole,
        },
      )
      if (res.status === 200) {
        dispatch(setSnackBarSuccess(true))
        dispatch(getAllUsers())
        dispatch(setDialog(false))
      }
    } catch (error) {
      dispatch(setSnackBarError(true))
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Stack p="10px 0">
        <DialogTitle color="primary">Manage Role</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setCurrentRole(e.target.value)}
            >
              {options.map((elem) => (
                <FormControlLabel
                  key={elem}
                  value={elem}
                  control={<Radio size="small" />}
                  label={elem}
                  checked={currentRole === elem ? true : false}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" size="small" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
