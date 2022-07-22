import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setSnackBarSuccess } from '../../redux/features/popUpSlice'

type Props = {
  text: string
}

export default function SnackBarSuccess({ text }: Props) {
  const dispatch = useAppDispatch()
  const { openSnackBarSuccess } = useAppSelector((state) => state.popUp)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    if (openSnackBarSuccess) {
      dispatch(setSnackBarSuccess(false))
    }
  }

  return (
    <Snackbar
      open={openSnackBarSuccess}
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
