import { Button } from '@mui/material'
import { useRouter } from 'next/router'

import { useAppDispatch } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'

export default function Logout() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  function handleLogout() {
    dispatch(logout())
    localStorage.clear()
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
