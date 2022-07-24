import { Container } from '@mui/system'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { getProfile } from '../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
  setSnackBarError,
  setSnackBarSuccess,
} from '../redux/features/popUpSlice'
import NavBar from './Nav/NavBar'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    }

    // router.asPath => SnackBar will turn off
    // whenever route changes
    dispatch(setSnackBarSuccess(false))
    dispatch(setSnackBarError(false))
  }, [dispatch, isAuthenticated, router.asPath])

  return (
    <>
      <Container maxWidth="lg">
        <NavBar />
        <main>{children}</main>
      </Container>
    </>
  )
}
