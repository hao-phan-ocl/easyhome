import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'

let hasAccessToken = false
if (typeof window !== 'undefined') {
  if (localStorage.getItem('accessToken')) {
    hasAccessToken = true
  }
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
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
