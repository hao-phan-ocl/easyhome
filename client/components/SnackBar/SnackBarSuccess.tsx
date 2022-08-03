import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openSnackBarSuccess } from '../../redux/features/popUpSlice'

type SuccessProps = {
  text: string
}

export default function SnackBarSuccess({ text }: SuccessProps) {
  const { snackBarSuccess } = useAppSelector((state) => state.popUp)
  const dispatch = useAppDispatch()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(openSnackBarSuccess(false))
  }

  return (
    <Snackbar
      open={snackBarSuccess}
      autoHideDuration={4000}
      onClose={handleClose}
    >
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
