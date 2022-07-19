import { Container } from '@mui/system'
import { ReactNode, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getProfile } from '../redux/features/authSlice'
import NavBar from './Nav/NavBar'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    }
  }, [dispatch, isAuthenticated])

  return (
    <>
      <Container maxWidth="lg">
        <NavBar />
        <main>{children}</main>
      </Container>
    </>
  )
}
