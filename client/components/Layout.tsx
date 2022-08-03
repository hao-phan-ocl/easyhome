import { Container } from '@mui/system'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

import { getProfile } from '../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
  openSnackBarError,
  openSnackBarSuccess,
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
    dispatch(openSnackBarSuccess(false))
    dispatch(openSnackBarError(false))
  }, [dispatch, isAuthenticated, router.asPath])

  return (
    <Container maxWidth="lg">
      <NavBar />
      {/* {pathNames.includes(router.pathname) && <SubNav />} */}
      <main>{children}</main>
    </Container>
  )
}
