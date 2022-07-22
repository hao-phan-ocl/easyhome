import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  openSnackBar: boolean
  openDialog: boolean
}

const initialState: InitialState = {
  openSnackBar: false,
  openDialog: false,
}

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,

  reducers: {
    setSnackBar: (state, action) => {
      state.openSnackBar = action.payload
    },
    setDialog: (state, action) => {
      state.openDialog = action.payload
    },
  },
})

export const { setSnackBar, setDialog } = popUpSlice.actions
export default popUpSlice.reducer
