import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Room } from '../../types/schemas'

type InitialState = {
  room: Room | null
  status: 'success' | 'error' | 'loading' | 'idle'
}

const initialState: InitialState = {
  room: null,
  status: 'idle',
}

export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (roomId: string) => {
    const res = await instance.get<Room>(request('rooms', 'single', roomId))
    return res.data
  },
)

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoom.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchRoom.fulfilled, (state, action) => {
      state.room = action.payload
      state.status = 'success'
    })
  },
})

export default roomSlice.reducer
