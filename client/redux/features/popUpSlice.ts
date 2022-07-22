import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  openSnackBarSuccess: boolean
  openSnackBarError: boolean
  openDialog: boolean
}

const initialState: InitialState = {
  openSnackBarSuccess: false,
  openSnackBarError: false,
  openDialog: false,
}

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,

  reducers: {
    setSnackBarSuccess: (state, action) => {
      state.openSnackBarSuccess = action.payload
    },
    setSnackBarError: (state, action) => {
      state.openSnackBarError = action.payload
    },
    setDialog: (state, action) => {
      state.openDialog = action.payload
    },
  },
})

export const { setSnackBarSuccess, setSnackBarError, setDialog } =
  popUpSlice.actions
export default popUpSlice.reducer
