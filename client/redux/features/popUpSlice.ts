import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  snackBarSuccess: boolean
  snackBarError: boolean
  snackBarMsg?: string
  openDialog: boolean
}

const initialState: InitialState = {
  snackBarSuccess: false,
  snackBarError: false,
  openDialog: false,
}

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,

  reducers: {
    openSnackBarSuccess: (state, action) => {
      state.snackBarSuccess = action.payload
    },
    setSnackBarMsg: (state, action) => {
      state.snackBarMsg = action.payload
    },
    openSnackBarError: (state, action) => {
      state.snackBarError = action.payload
    },
    setDialog: (state, action) => {
      state.openDialog = action.payload
    },
  },
})

export const {
  openSnackBarSuccess,
  openSnackBarError,
  setSnackBarMsg,
  setDialog,
} = popUpSlice.actions
export default popUpSlice.reducer
