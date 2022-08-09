import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { Room } from '../../types/types'

type InitialState = {
  rooms: Room[]
  filteredRooms: Room[]
  status: 'success' | 'error' | 'loading' | 'idle'
}

const initialState: InitialState = {
  rooms: [],
  filteredRooms: [],
  status: 'idle',
}

export const fetchAllRooms = createAsyncThunk(
  'rooms/fetchAllRooms',
  async () => {
    const res = await instance.get<Room[]>(request('rooms', 'all'))
    return res.data
  },
)

export const allRoomsSlice = createSlice({
  name: 'allRoom',
  initialState,
  reducers: {
    setAllRooms: (state, action) => {
      state.filteredRooms = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.rooms = action.payload
      state.status = 'success'
    })
  },
})

export const { setAllRooms } = allRoomsSlice.actions
export default allRoomsSlice.reducer
