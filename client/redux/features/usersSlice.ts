import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { User } from '../../types/types'

type InitialState = {
  users: User[]
  status: 'success' | 'error' | 'loading' | 'idle'
}

const initialState: InitialState = {
  users: [],
  status: 'idle',
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const res = await instance.get<User[]>(request('users', 'all'))
  return res.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.status = 'success'
    })
  },
})

export default usersSlice.reducer
