import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Container } from '@mui/system'

import { store } from '../redux/store'
import theme from '../theme/theme'
import NavBar from '../components/Nav/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <NavBar />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
