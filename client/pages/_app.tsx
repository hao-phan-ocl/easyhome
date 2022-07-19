import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'

import { store } from '../redux/store'
import theme from '../theme/theme'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
