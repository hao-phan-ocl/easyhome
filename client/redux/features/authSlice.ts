import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { User } from '../../types/schemas'
import { RootState } from '../store'

type InitialState = {
  isAuthenticated: boolean
  user: User | null
  status: 'success' | 'error' | 'loading' | 'idle'
  error?: Error
}

const initialState: InitialState = {
  isAuthenticated: false,
  status: 'idle',
  user: null,
}

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState
    const hasAccessToken = state.auth.isAuthenticated

    if (hasAccessToken) {
      const res = await instance.get<User>(request('users', 'profile'))
      return res.data
    }
    return null
  },
)

export const addFav = createAsyncThunk(
  'users/addFav',
  async (roomId: string) => {
    const res = await instance.put<User>(
      request('users', 'add-favorite', roomId),
    )
    return res.data
  },
)

export const removeFav = createAsyncThunk(
  'users/removeFav',
  async (roomId: string) => {
    const res = await instance.put<User>(
      request('users', 'remove-favorite', roomId),
    )
    return res.data
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true
    },
    loginFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
      state.status = 'error'
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'success'
    })
    builder.addCase(addFav.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'success'
    })
    builder.addCase(removeFav.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'success'
    })
  },
})

export const { loginSuccess, loginFailed, logout } = authSlice.actions
export default authSlice.reducer
