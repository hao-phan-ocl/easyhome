import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import popUpSlice from './features/popUpSlice'
import usersSlice from './features/usersSlice'

let hasAccessToken = false
if (typeof window !== 'undefined') {
  if (localStorage.getItem('accessToken')) {
    hasAccessToken = true
  }
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    popUp: popUpSlice,
  },
  preloadedState: {
    auth: {
      isAuthenticated: hasAccessToken,
      user: null,
      status: 'idle',
    },
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
