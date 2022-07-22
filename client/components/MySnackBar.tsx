import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setSnackBar } from '../redux/features/popUpSlice'

type Props = {
  text: string
}

export default function MySnackBar({ text }: Props) {
  const dispatch = useAppDispatch()
  const { openSnackBar } = useAppSelector((state) => state.popUp)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setSnackBar(false))
  }

  return (
    <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: '100%' }}
        variant="filled"
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
