import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID as string}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

export default MyApp
