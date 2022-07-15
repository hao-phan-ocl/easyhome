import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_ID as string}
      >
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default MyApp
