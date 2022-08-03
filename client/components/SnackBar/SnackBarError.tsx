import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openSnackBarError } from '../../redux/features/popUpSlice'

type Props = {
  text: string
}

export default function SnackBarError({ text }: Props) {
  const dispatch = useAppDispatch()
  const { snackBarError } = useAppSelector((state) => state.popUp)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(openSnackBarError(false))
  }

  return (
    <Snackbar
      open={snackBarError}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%' }}
        variant="filled"
      >
        {text}
      </Alert>
    </Snackbar>
  )
}
