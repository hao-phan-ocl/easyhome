import axios from 'axios'
import type { NextPage } from 'next'

import GoogleButton from '../components/GoogleButton'

const Home: NextPage = () => {
  async function googleLogin() {
    window.open(
      'http://localhost:5000/login/google',
      '_self',
      // 'width=400, height=500',
    )
  }

  return (
    <>
      <GoogleButton />
      <button onClick={googleLogin}>Google Login</button>
    </>
  )
}

export default Home
